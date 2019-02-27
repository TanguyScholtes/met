import io from "socket.io-client";

const socket = io();

export const ask_createRoom = data => {
    socket.emit("create_room", data);
};

export const listen_createRoom = callback => {
    return socket.on("create_room_event", data => {
        callback(data);
    });
};
