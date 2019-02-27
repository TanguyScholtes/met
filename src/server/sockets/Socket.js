let {SOCKET_LIST, User} = require("../models/Global");
const {RoomsHandler} = require("./RoomHandler");
const {GameHandler} = require("./GameHandler");
const {UserHandler} = require("./UserHandler");

const SocketHandler = (socket) => {
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

    RoomsHandler(socket);
    GameHandler(socket);
    UserHandler(socket);

    socket.on("disconnect", () => {
        let message = `Disconnected ${SOCKET_LIST[socket.id].pseudo}`;
        console.log( "disconnect", message );
        delete SOCKET_LIST[socket.id];
        socket.emit( "disconnect_event", { success: message } );
        return message;
    });
};

module.exports = {SocketHandler};