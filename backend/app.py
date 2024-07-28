from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, resources=r'/greet/*')

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
    headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}

    return jsonify({'message': f'Hello, {name}!',
                    'headers': headers})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,  debug=False)
