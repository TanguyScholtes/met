let {addSocket, removeSocket} = require("../models/Global");
const {RoomsHandler} = require("./RoomHandler");
const {GameHandler} = require("./GameHandler");
const {UserHandler} = require("./UserHandler");

const SocketHandler = socket => {
    socket.id = Math.random();
    addSocket(socket);

    RoomsHandler(socket);
    GameHandler(socket);
    UserHandler(socket);

    socket.on("disconnect", () => {
        removeSocket(socket);
        socket.emit("disconnect_event", {success: "Disconncted"});
    });
};

module.exports = {SocketHandler};
