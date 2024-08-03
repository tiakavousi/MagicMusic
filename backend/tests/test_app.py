import unittest
import sys
import os
from unittest.mock import patch, MagicMock

current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.append(project_root)


from app import app


class TestGreetAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        # patch your mysql connection
        self.mock_connection_patcher = patch(
            'flask_mysqldb.MySQL.connection', MagicMock())
        self.mock_connection = self.mock_connection_patcher.start()
        # patch cursor to return a mock cursor
        self.mock_cursor_patcher = patch(
            'flask_mysqldb.MySQL.connection.cursor',
            MagicMock(return_value=MagicMock()))
        self.mock_cursor = self.mock_cursor_patcher.start()

    def tearDown(self):
        # Stop the patches
        self.mock_cursor_patcher.stop()
        self.mock_connection_patcher.stop()

    def test_greet_success(self):
        payload = {"name": "Alice"}
        response = self.app.post('/greet', json=payload)
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Hello, Alice')


if __name__ == '__main__':
    unittest.main()
