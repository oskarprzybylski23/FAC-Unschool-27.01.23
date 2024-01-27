let apiKey = '';

document.getElementById('textarea-submit').onclick = function () {
  let text = document.getElementById('user-text').value;
  document.getElementById('user-text-placeholder').innerText = `user: ${text}`;
};

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('API-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the default form submission action

    let apiKey = document.getElementById('input-api-key').value;
    document.getElementById('input-api-key').value = '';

    console.log(apiKey);
    return apiKey;
  });
});
