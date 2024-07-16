import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [musics, setMusics] = useState([]);
  const [name, setName] = useState('');
  const [singer, setSinger] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/musics')
      .then(response => setMusics(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/musics', { name, singer })
      .then(response => {
        setMusics([...musics, { name, singer }]);
        setName('');
        setSinger('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Magic Musics</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Music's Name"
          required
        />
        <input
          type="text"
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
          placeholder="Singer's Name"
          required
        />
        <button type="submit">Add to playlist</button>
      </form>
      <h2>Musics</h2>
      <ul>
        {musics.map((music, index) => (
          <li key={index}>{music.name}, {music.singer}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
