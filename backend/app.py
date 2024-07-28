from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)

def cors_origin_func(origin):
    allowed_origins = [
        "http://localhost",
        "http://*.amazonaws.com"
    ]
    for pattern in allowed_origins:
        if origin.startswith(pattern.replace('*', '')):
            return True
    return False

CORS(app, supports_credentials=True, resources={r"/*": {"origins": cors_origin_func}})


# MySQL configurations
app.config['MYSQL_USER'] = 'user'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'greeting_app'
app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)




@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/greet', methods=['POST'])
def greet():
    name = request.json['name']
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (name) VALUES (%s)", (name,))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': f'Hello, {name}!'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,  debug=True)
