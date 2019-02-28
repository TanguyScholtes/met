let {addSocket, removeSocket} = require("../models/Global");
const {roomsHandler} = require("./RoomHandler");
const {gameHandler} = require("./GameHandler");
const {userHandler} = require("./UserHandler");

const SocketHandler = socket => {
    socket.id = Math.random();
    addSocket(socket);

    roomsHandler(socket);
    gameHandler(socket);
    userHandler(socket);

    socket.on("disconnect", () => {
        removeSocket(socket);
        socket.emit("disconnect_event", {success: "Disconncted"});
    });
};

module.exports = {SocketHandler};
