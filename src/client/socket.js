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

export const ask_allRooms = () => {
    socket.emit("get_all_rooms");
};

export const listen_allRooms = () => {
    return;
};
