document.getElementById('greet-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    // const url = 'http://localhost:5000/greet';
    const url = 'http://backend-service.magicmusic.local:5000/greet';
    // const url = 'http://backend:5000/greet';
    const data = {"name": name};

    const headers={
        'Content-type':'application/json', 
        'Accept':'application/json'
    }

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        document.getElementById('greeting-message').innerText = result.message;
    } catch (error) {
        console.error('Error:', error);
    }
});

