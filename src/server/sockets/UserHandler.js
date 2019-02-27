const {ROOMS_LIST} = require("../models/Global");

const UserHandler = socket => {
    socket.on("update_emoji", data => {
        if (!data.emoji || !data.room) {
            let message = "Missing room name and/or emoji";
            console.error("update_emoji", message);
            let error = new Error(message);
            socker.emit("update_emoji_event", {error: error});
            return error;
        }

        ROOMS_LIST[data.room].players[socket.id].status = data.emoji;

        console.log("update_emoji", ROOMS_LIST[data.room].players[socket.id]);
        socket.emit("update_emoji_event", {
            player: ROOMS_LIST[data.room].players[socket.id],
        }); 
        return ROOMS_LIST[data.room].players[socket.id];
    });
};

module.exports = {UserHandler};
