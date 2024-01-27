document.getElementById('textarea-submit').onclick = function () {
  let text = document.getElementById('user-text').value;
  document.getElementById('user-text-placeholder').innerText = text;
};
