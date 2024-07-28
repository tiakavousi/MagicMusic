document.getElementById('greet-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    const url = 'http://localhost:5000/greet';
    const data = {"name": name};

    // const headers={
    //     'Content-type':'application/json', 
    //     'Accept':'application/json'
    // }

    // const headers = {'Content-Type':'application/json',
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
    const headers = {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    try {
        const response = await fetch(url, {
            method: 'POST', 
            statusCode: 200,
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

