import unittest
from unittest.mock import patch, MagicMock
from app import app, Music

class TestMusicAPI(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    @patch('app.Music.query')
    def test_get_musics(self, mock_query):
        # Arrange
        mock_music1 = Music(id=1, name='Song1', singer='Singer1')
        mock_music2 = Music(id=2, name='Song2', singer='Singer2')
        mock_query.all.return_value = [mock_music1, mock_music2]

        # Act
        response = self.app.get('/musics')

        # Assert
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], 'Song1')
        self.assertEqual(data[0]['singer'], 'Singer1')
        self.assertEqual(data[1]['name'], 'Song2')
        self.assertEqual(data[1]['singer'], 'Singer2')

    @patch('app.db.session')
    @patch('app.Music')
    def test_add_music(self, mock_music, mock_session):
        # Arrange
        mock_music_instance = Music(id=1, name='Song3', singer='Singer3')
        mock_music.return_value = mock_music_instance

        # Act
        response = self.app.post('/musics', json={'name': 'Song3', 'singer': 'Singer3'})

        # Assert
        self.assertEqual(response.status_code, 201)
        data = response.json
        self.assertEqual(data['name'], 'Song3')
        self.assertEqual(data['singer'], 'Singer3')
        self.assertTrue(mock_session.add.called)
        self.assertTrue(mock_session.commit.called)

if __name__ == '__main__':
    unittest.main()
