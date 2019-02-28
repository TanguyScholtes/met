import io from "socket.io-client";

const socket = io();

export const ask_createRoom = data => {
    return socket.emit("create_room", data);
};

export const listen_createRoom = callback => {
    return socket.on("create_room_event", data => {
        callback(data);
    });
};

export const ask_joinRoom = data => {
    socket.emit("join_room", data);
};

export const listen_allRooms = () => {
    return;
};

export const update_emoji = data => {
    return socket.emit("update_emoji", data);
};

export const emoji_updated = callback => {
    return socket.on("update_emoji_event", data => {
        console.log("sockets", data);
        callback(data);
    });
};
