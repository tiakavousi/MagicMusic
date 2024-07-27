document.addEventListener('DOMContentLoaded', () => {
    const musicForm = document.getElementById('music-form');
    const nameInput = document.getElementById('name');
    const singerInput = document.getElementById('singer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const musicList = document.getElementById('music-list');
  
    let musics = [];
  
    const fetchMusics = () => {
      loadingElement.style.display = 'block';
      errorElement.style.display = 'none';
  
       fetch('http://localhost:5000/musics')
        .then(response => response.json())
        .then(data => {
          musics = data;
          renderMusics();
        })
        .catch(error => {
          console.error(error);
          errorElement.textContent = 'Failed to fetch musics. Please try again later.';
          errorElement.style.display = 'block';
        })
        .finally(() => {
          loadingElement.style.display = 'none';
        });
    };
  
    const renderMusics = () => {
      number = document.getElementById("number")
      number.innerHTML = musics
    };
  
    musicForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value;
      const singer = singerInput.value;
  
      fetch('http://localhost:5000/musics')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          musics = data;
          renderMusics();
        })
        .catch(error => {
          console.error('Fetch error:', error);
          errorElement.textContent = 'Failed to fetch musics. Please try again later.';
          errorElement.style.display = 'block';
        })
        .finally(() => {
          loadingElement.style.display = 'none';
        });
    });
  
    fetchMusics();
  });
  