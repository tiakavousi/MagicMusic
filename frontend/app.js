document.getElementById('greet-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    try {
        const response = await fetch('http://backend:5000/greet', {
            method: 'POST',
            headers: {
               xhrFields: {
                withCredentials: true
                },
                crossDomain: true,
                contentType: 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ name })
        });
        if (response.ok) {
            const result = await response.json();
            document.getElementById('greeting-message').innerText = result.message;
        } else {
            document.getElementById('greeting-message').innerText = 'Error: Unable to greet!';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('greeting-message').innerText = 'Error: Unable to greet!';
    }
});
