var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

var socket_connections = {};

app.use('/js',  express.static(__dirname + '/js'));
app.use('/style',  express.static(__dirname + '/style'));

app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/mobile', function(req,res){
  res.sendfile('mobile_control.html');
});

app.post('/mobile_data', function(req,res){
  // Object.keys(socket_connections).each(function(socket_id){
  //   socket_connections[socket_id]
  // });

  console.log(req.body.direction, "Time taken", Date.now()-req.body.time);
  io.emit('move_event', req.body.direction);
});

io.on('connection', function(socket){
  socket_connections[socket.id] = socket;
  console.log('a user connected');

  socket.on('movement', function(msg){
    console.log(msg.direction, "Time taken", Date.now()-msg.time);
     io.emit('move_event', msg.direction);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    delete socket_connections[socket.id];
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
