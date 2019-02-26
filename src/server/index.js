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
        socket.emit( "login_event", { users: SOCKET_LIST } );
        return SOCKET_LIST;
    });

    socket.on("create_room", data => {
        if (ROOMS_LIST[data.name]) {
            let message = `${ROOMS_LIST[data.name]} already exists`
            console.error("create_room", message);
            let error = new Error( message )
            socket.emit( "create_room_event", { error: error } );
            return error;
        } else if ( !data.name || typeof data.name != 'string' || data.name === '' ) {
            let message = "Name invalid. Cannot create room"
            console.error( "create_room", message );
            let error = new Error( message );
            socket.emit( "create_room_event", { error: error } );
            return error;
        } else {
            let room = new Room( data.name, data.numbers, SOCKET_LIST[socket.id] );
            SOCKET_LIST[socket.id].hosted = room.id;
            ROOMS_LIST[room.id] = room;
            console.log( "create_room", room );
            socket.emit( "create_room_event", { room: room } );
            return room;
        }
    });

    socket.on("join_room", data => {
        if( ROOMS_LIST[data.name] && ROOMS_LIST[data.name].players.length < ROOMS_LIST[data.name].playersNumber && ROOMS_LIST[data.name].state === "waiting" ) {
            // room exists & has available slots & is joinable

            // Add user to room
            ROOMS_LIST[data.name].players[ socket.id ] = SOCKET_LIST[socket.id];

            // If joining user fills the romm to desired number, switch room state
            if( ROOMS_LIST[data.name].players.length === ROOMS_LIST[data.name].playersNumber ) {
                ROOMS_LIST[data.name].state = "pending";
            }

            // Send room with new user added
            console.log("join_room", ROOMS_LIST[data.name]);
            socket.emit( "join_room_event", { room: ROOMS_LIST[data.name] } );
            return ROOMS_LIST[data.name];
        } else {
            let message = `Room ${data.name} is full, a game in underway or room does not exists`;
            console.error( "join_room", message );
            let error = new Error( message );
            socket.emit( "join_room_event", { error: error } );
            return error;
        }
    });

    socket.on( "get_room", data => {
        if( ROOMS_LIST[ data.name ] ) {
            console.log( "get_room", ROOMS_LIST[ data.name ] );
            socket.emit( "get_room_event", { room: ROOMS_LIST[ data.name ] } );
            return ROOMS_LIST[ data.name ];
        } else {
            let message = `No room with name ${data.name}`;
            console.error( "get_room", message );
            let error = new Error( message );
            socket.emit( "get_room_event", { error: error } );
            return error;
        }
    } );

    socket.on( "get_all_rooms", () => {
        if( ROOMS_LIST.length >= 0 ) {
            console.log( "get_all_rooms", ROOMS_LIST );
            socket.emit( "get_all_rooms_event", { rooms: ROOMS_LIST } );
            return ROOMS_LIST;
        } else {
            let message = `No room to display`;
            console.error( "get_all_rooms", message );
            let error = new Error( message );
            socket.emit( "get_all_rooms_event", { error: error } );
            return error;
        }
    } );

    socket.on("disconnect", () => {
        let message = `Disconnected ${SOCKET_LIST[socket.id].pseudo}`;
        console.log( "disconnect", message );
        delete SOCKET_LIST[socket.id];
        socket.emit( "disconnect_event", { success: message } );
        return message;
    });

    socket.on( "generate_combination", data => {
        if( !data.name || !data.number ) {
            let message = "Missing room name and/or number of players";
            console.error( "generate_combination", message );
            let error = new Error( message );
            socket.emit( "generate_combination_event", { error: error } );
            return error;
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
        socket.emit( "generate_combination_event", { combination: ROOMS_LIST[data.name].combination } );
        return ROOMS_LIST[data.name].combination;
    } );

    socket.on( "update_emoji", data => {
        if( !data.emoji || !data.room ) {
            let message = "Missing room name and/or emoji";
            console.error( "update_emoji", message );
            let error = new Error( message );
            socker.emit( "update_emoji_event", { error: error } );
            return error;
        }

        ROOMS_LIST[data.room].players[socket.id].status = data.emoji;

        console.log( "update_emoji", ROOMS_LIST[data.room].players[socket.id] );
        socket.emit( "update_emoji_event", { player: ROOMS_LIST[data.room].players[socket.id] } );
        return ROOMS_LIST[data.room].players[socket.id];
    } );

    socket.on( "submit_combination", data => {
        if( !data.combination || !data.room ) {
            let message = "Missing room name and/or combination";
            console.error( "submit-combination", message );
            let error = new Error( message );
            socket.emit( "submit_combination_event", { error: error } );
            return error;
        }

        // get user's submitted combination
        let userCombination = [];
        data.combination.forEach( color => {
            userCombination.push( new Pin( color ) );
        } );
        // compare room's combination & user's submitted combination
        if ( ROOMS_LIST[ data.room ].combination === userCombination ) {
            console.log( "You won. GG WP !" );
            socket.emit( "submit_combination_event", { success: "You won. GG WP !" } );
            return "You won. GG WP !";
        }

        // hints - based on ponderation
        // Each user-submitted element get a ponderation based on comparison with server-side combination elements :
        // + 2 for good color & position
        // + 1 for good color but wrong position
        // + 0 for wrong color
        // We keep only the highest ponderation for each pin, thus a match won't become a misplaced
        for ( let i = 0; i < ROOMS_LIST[ data.room ].combination.length; i++ ) {
            for ( let j = 0; j < userCombination.length; j++ ) {
                if ( ROOMS_LIST[ data.room ].combination[i].color === userCombination[j].color && i === j ) {
                    // good color & good position => get green (2)
                    userCombination[j].hint = 2;
                } else if ( ROOMS_LIST[ data.room ].combination[i].color === userCombination[j].color && i != j ) {
                    // good color, wrong position => orange (1)
                    if ( userCombination[j].hint < 1 ) {
                        userCombination[j].hint = 1;
                    }
                }
                // wrong color => red (0) / default value, not modif needed
            }
        }

        // return hints about user's combination
        console.log( "submit-combination", userCombination );
        socket.emit( "submit_combination_event", { hints: userCombination } );
        return userCombination;
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
