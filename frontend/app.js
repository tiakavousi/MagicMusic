document.getElementById('greet-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    const url = 'backend-service:5000/greet';

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({"name": name}),
        });
        const result = await response.json();
        console.log(result);
        document.getElementById('greeting-message').innerText = result.message;
    } catch (error) {
        console.error('Error:', error);
    } 
});