from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


# app.config['SQLALCHEMY_DATABASE_URI'] =
# 'mysql+pymysql://user:password@db/musics_db'


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URI"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Music(db.Model):
    __tablename__ = 'musics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    singer = db.Column(db.String(80), nullable=False)


@app.route('/musics', methods=['GET'])
def get_musics():
    try:
        musics = Music.query.all()
        return jsonify([{
            'id': r.id,
            'name': r.name,
            'singer': r.singer} for r in musics])
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@app.route('/musics', methods=['POST'])
def add_music():
    data = request.json
    try:
        new_music = Music(name=data['name'], singer=data['singer'])
        db.session.add(new_music)
        db.session.commit()
        return jsonify({
            'id': new_music.id,
            'name': new_music.name,
            'singer': new_music.singer}), 201
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0')
