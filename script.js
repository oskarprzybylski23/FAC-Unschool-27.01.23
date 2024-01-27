let apiKey = '';

const conversationField = document.getElementById('conversation-field');

function appendToConversation(role, text) {
  const messageParagraph = document.createElement('p');
  messageParagraph.className = role; // This could be 'user' or 'response' for styling purposes
  messageParagraph.innerText = `${
    role === 'user' ? 'User: ' : 'ChatGPT: '
  }${text}`;
  conversationField.appendChild(messageParagraph);
}

function sendToOpenAI(userInput) {
  // Ensure apiKey is not empty
  if (!apiKey) {
    console.error('API key is not set.');
    alert('set API key first!');
    if (conversationField.lastChild) {
      conversationField.removeChild(conversationField.lastChild);
    }
    return;
  }

  // API URL
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const messagesElements =
    document.getElementById('conversation-field').children;

  //   contruct conversation history array
  let messages = Array.from(messagesElements).map((messageElement) => {
    return {
      role: messageElement.className, // Assuming the className is 'user' or 'response'
      content: messageElement.innerText
        .replace(/^User: /, '')
        .replace(/^AI: /, ''),
    };
  });

  console.log(messages);

  // Data to be sent in the request body
  const data = {
    model: 'gpt-3.5-turbo', // Specify the model here
    messages: messages,
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

  console.log(JSON.stringify(data));
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

      const aiResponse = data.choices[0].message.content;
      appendToConversation('system', aiResponse);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
      alert('Error! Check your API key!');
      if (conversationField.lastChild) {
        conversationField.removeChild(conversationField.lastChild);
      }
    });
}

document.getElementById('textarea-submit').onclick = function () {
  let text = document.getElementById('user-text').value;
  appendToConversation('user', text);
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
