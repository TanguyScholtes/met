const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {APP_PORT} = process.env || 5000;

let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../../client/index.html");
});

http.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

let SOCKET_LIST = [];
let ROOMS_LIST = [];

io.sockets.on("connection", socket => {
    socket.id = Math.random();

    SOCKET_LIST[socket.id] = socket;

    for (let i in SOCKET_LIST) {
        console.log("base", i);
    }

    socket.on("login", data => {
        let user = {
            id: socket.id,
            pseudo: data.pseudo,
            score: 0
        };
        SOCKET_LIST[socket.id] = user;
        console.log("login", SOCKET_LIST);
    });

    socket.on("create_room", data => {
        if (ROOMS_LIST[data.name]) {
            console.log("create_room", ROOMS_LIST[data.name]);
        }

        let room = {};
        room.id = data.name;
        SOCKET_LIST[socket.id].hosted = room.id;
        room.numbers = data.numbers;
        room.players = [];
        room.players[ socket.id ] = SOCKET_LIST[socket.id];

        ROOMS_LIST[room.id] = room;
    });

    socket.on("join_room", data => {
        ROOMS_LIST[data.name].players[ socket.id ] = SOCKET_LIST[socket.id];
        console.log("join_room", ROOMS_LIST[data.name]);
    });

    socket.on("disconnect", () => {
        console.log( "disconnect", SOCKET_LIST[socket.id].pseudo );
        delete SOCKET_LIST[socket.id];
    });
});

/* var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.number = "" + Math.floor(10 * Math.random());
    SOCKET_LIST[socket.id] = socket;

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
    });

});

setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        pack.push({
            x:socket.x,
            y:socket.y,
            number:socket.number
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);
*/
