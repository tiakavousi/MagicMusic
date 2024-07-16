import unittest
from flask_testing import TestCase
from app import app, db, Music

class TestMusicApp(TestCase):
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    TESTING = True

    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_musics(self):
        response = self.client.get('/musics')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

    def test_add_music(self):
        response = self.client.post('/musics', json={'name': 'Song1', 'singer': 'Singer1'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['name'], 'Song1')
        self.assertEqual(response.json['singer'], 'Singer1')

        musics = Music.query.all()
        self.assertEqual(len(musics), 1)
        self.assertEqual(musics[0].name, 'Song1')

if __name__ == '__main__':
    unittest.main()
