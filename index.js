var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js',  express.static(__dirname + '/js'));
app.use('/style',  express.static(__dirname + '/style'));


app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/mobile', function(req,res){
  res.sendfile('mobile_control.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('movement', function(msg){
    console.log(msg);
     io.emit('move_event', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
