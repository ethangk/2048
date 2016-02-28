var socket = io();
socket.on('move_event', function (data) {
  console.log(data);
  g.inputManager.emit('move', data)
});