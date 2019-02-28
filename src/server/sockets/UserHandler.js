const {getRoom} = require("../models/Global");

const UserHandler = socket => {
    socket.on("update_emoji", data => {
        console.log(data);
        if (!data.emoji || !data.name || !data.pseudo) {
            let message = "Missing room name and/or emoji";
            console.error("update_emoji", message);
            socket.emit("update_emoji_event", {error: new Error(message)});
            return;
        }

        getRoom(data.name).getPlayer(data.pseudo).status = data.emoji;

        console.log("update_emoji", getRoom(data.name).getPlayer(data.pseudo));
        socket.emit("update_emoji_event", {
            player: getRoom(data.name).getPlayer(data.pseudo),
        });
        return;
    });
};

module.exports = {UserHandler};
