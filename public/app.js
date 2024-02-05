const username = getUsername();
const socket = io();
const buttonSend = document.querySelector('#send_message');

function getUsername() {
  let name = prompt();

  if (name == null) return getUsername();

  name = name.trim();

  if (name == "") return getUsername();

  return name;
}

function sendMessage() {
  const message = document.querySelector('#message_input').value.trim();

  if (message === '') return;

  const data = {
    username,
    message
  };

  socket.emit('message', data);
  document.querySelector('#message_input').value = '';

  createMessage(data);
}

buttonSend.addEventListener('click', sendMessage);

socket.on('message', (data) => {
  createMessage(data, false);
})

function createMessage(data, actualUser = true) {
  const { username, message } = data;

  const html = `
    <div class="messager_user ${actualUser ? 'actual_user' : ''}">
      <span class="message_username fst-italic ${actualUser ? 'text-primary' : 'text-secondary'}">${actualUser ? 'You' : username}</span>
      <div class="message_content">
        <p>${message}</p>
      </div>
    </div>
  `;

  document.querySelector('#chat_messages').insertAdjacentHTML('beforeend', html);
}