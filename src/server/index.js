const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {APP_PORT} = process.env || 5000;

let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let {User} = require( "./models/User.js" );
let {Pin} = require( "./models/Pin.js" );
let {Room} = require( "./models/Room.js" );

let rng = function ( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.all("*", (req, res) => {
    res.sendFile(__dirname + "../../client/index.html");
});

http.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

let SOCKET_LIST = [];
let ROOMS_LIST = [];
const COLORS = [ 'yellow', 'blue', 'red', 'green', 'white', 'black', 'purple', 'pink' ];

io.sockets.on("connection", socket => {
    socket.id = Math.random();

    SOCKET_LIST[socket.id] = socket;

    for (let i in SOCKET_LIST) {
        console.log("base", i);
    }

    socket.on("login", data => {
        let user = new User( socket.id, data.pseudo );
        SOCKET_LIST[socket.id] = user;
        console.log("login", SOCKET_LIST);
    });

    socket.on("create_room", data => {
        if (ROOMS_LIST[data.name]) {
            console.error("create_room", `${ROOMS_LIST[data.name]} already exists`);
        } else if ( !data.name || typeof data.name != 'string' || data.name === '' ) {
            console.error( "create_room", "Name invalid. Cannot create room" )
        } else {
            let room = new Room( data.name, data.numbers, SOCKET_LIST[socket.id] );
            SOCKET_LIST[socket.id].hosted = room.id;
            ROOMS_LIST[room.id] = room;
        }
    });

    socket.on("join_room", data => {
        ROOMS_LIST[data.name].players[ socket.id ] = SOCKET_LIST[socket.id];
        console.log("join_room", ROOMS_LIST[data.name]);
    });

    socket.on( "get_room", data => {
        if( ROOMS_LIST[ data.name ] ) {
            console.log( "get_room", ROOMS_LIST[ data.name ] );
        } else {
            console.error( "get_room", `No room with name ${data.name}` );
        }
    } );

    socket.on( "get_all_rooms", () => {
        if( ROOMS_LIST.length >= 0 ) {
            console.log( "get_all_rooms", ROOMS_LIST );
        } else {
            console.error( "get_all_rooms", "No room to display" );
        }
    } );

    socket.on("disconnect", () => {
        console.log( "disconnect", SOCKET_LIST[socket.id].pseudo );
        delete SOCKET_LIST[socket.id];
    });

    socket.on( "generate_combination", data => {
        if( !data.name || !data.number ) {
            console.error( "generate_combination", "Missing room name and/or number of players" );
            return;
        }

        ROOMS_LIST[data.name].combination = [];

        if ( data.number === 2 ) {
            for( let i = 1; i <= 5; i++ ) {
                ROOMS_LIST[data.name].combination.push( new Pin( COLORS[ rng( 0, 5 ) ] ) );
            }
        } else if ( data.number === 3 ) {
            for( let i = 1; i <= 6; i++ ) {
                ROOMS_LIST[data.name].combination.push( new Pin( COLORS[ rng( 0, 7 ) ] ) );
            }
        } else if ( data.number >= 4 ) {
            ROOMS_LIST[data.name].maxTries = 8;
            for( let i = 1; i <= 6; i++ ) {
                ROOMS_LIST[data.name].combination.push( new Pin( COLORS[ rng( 0, 7 ) ] ) );
            }
        } else {
            for( let i = 1; i <= 4; i++ ) {
                ROOMS_LIST[data.name].combination.push( new Pin( COLORS[ rng( 0, 5 ) ] ) );
            }
        }

        console.log( "generate_combination", ROOMS_LIST[data.name].combination );
    } );

    socket.on( "update_emoji", data => {
        if( !data.emoji || !data.room ) {
            console.error( "update_emoji", "Missing room name and/or emoji" );
            return;
        }

        ROOMS_LIST[data.room].players[socket.id].status = data.emoji;

        console.log( "update_emoji", ROOMS_LIST[data.room].players[socket.id] );
    } );

    socket.on( "submit-combination", data => {
        if( !data.combination || !data.room ) {
            console.error( "submit-combination", "Missing room name and/or combination" );
            return;
        }

        // get user's submitted combination
        let userCombination = [];
        data.combination.forEach( color => {
            userCombination.push( new Pin( color ) );
        } );
        // compare room's combination & user's submitted combination
        if ( ROOMS_LIST[ data.room ].combination === userCombination ) {
            console.log( "You won. GG WP !" );
            return;
        }

        // hints
        for ( let i = 0; i < ROOMS_LIST[ data.room ].combination.length; i++ ) {
            for ( let j = 0; j < userCombination.length; j++ ) {
                if ( ROOMS_LIST[ data.room ].combination[i] === userCombination[j] && i === j ) {
                    // good color & good position => get green
                    console.log( "submit-combination", `Pin number ${ j } is all good. Green.` );
                } else if (  ) {

                } else {

                }
            }
        }

        // return hints about user's combination
    } );
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
