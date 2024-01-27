let apiKey = '';

function sendToOpenAI(userInput) {
  // Ensure apiKey is not empty
  if (!apiKey) {
    console.error('API key is not set.');
    alert('set API key first!');
    document.getElementById('user-text-placeholder').innerText = '';
    return;
  }

  // API URL
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  // Data to be sent in the request body
  const data = {
    model: 'gpt-3.5-turbo', // Specify the model here
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: userInput,
      },
    ],
  };

  // Fetch options
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  };

  // Send request to OpenAI API
  fetch(apiUrl, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Process the response here
      // For example, display the response in the HTML
      document.getElementById(
        'response-placeholder'
      ).innerText = `chat-GPT: ${data.choices[0].message.content}`;
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });
}

document.getElementById('textarea-submit').onclick = function () {
  let text = document.getElementById('user-text').value;
  document.getElementById('user-text-placeholder').innerText = `user: ${text}`;
  sendToOpenAI(text);
};

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('API-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the default form submission action

    apiKey = document.getElementById('input-api-key').value;
    document.getElementById('input-api-key').value = '';

    console.log(apiKey);
  });
});
