document.body.innerHTML = `
  <form id="greet-form">
    <input type="text" id="name">
    <button type="submit">Greet</button>
  </form>
  <div id="greeting-message"></div>
`;

const form = document.getElementById('greet-form');
const nameInput = document.getElementById('name');
const greetingMessage = document.getElementById('greeting-message');

// Mock fetch to avoid making real network requests
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Mocked greeting!' }),
  })
);

// Require the app.js file after the DOM setup
require('../../app.js');

test('form submission updates greeting message', async () => {
  // Simulate user input
  nameInput.value = 'Alice';

  // Trigger form submission
  form.dispatchEvent(new Event('submit'));

  // Wait for the next tick of the event loop (for async operations to complete)
  await new Promise(process.nextTick);

  // Assertion: check if the greeting message has been updated
  expect(greetingMessage.innerText).toBe('Mocked greeting!');
});
