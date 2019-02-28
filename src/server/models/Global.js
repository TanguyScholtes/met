let ROOMS_LIST = [];
let SOCKET_LIST = [];

let {User} = require("./User");
let {Pin} = require("./Pin");
let {Room} = require("./Room");

const COLORS = [
    "yellow",
    "blue",
    "red",
    "green",
    "white",
    "black",
    "purple",
    "pink",
];

const rng = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getSocket = (socket_id) => {
    return SOCKET_LIST.find(socket => socket.id === socket_id);
}

const addSocket = (socket) => {
    SOCKET_LIST.push(socket);
}

const removeSocket = (socket_id) => {
    const id = SOCKET_LIST.findIndex(el => el.id === socket_id);
    delete SOCKET_LIST[id];
}

const getRoom = (room_name) => {
    return ROOMS_LIST.find(room => room.id === room_name);
}

const getRoomsForSelection = () => {
    return ROOMS_LIST.map(el => el.displaySelection());
}

const addRoom = (room) => {
    ROOMS_LIST.push(room);
}

const removeRoom = (room_name) => {
    const id = ROOMS_LIST.findIndex(el => el.name === room_name);
    delete ROOMS_LIST[id];
}

const updateRoom = (room) => {
    const id = ROOMS_LIST.findIndex(el => el.name === room.name);
    ROOMS_LIST[id] = room;
}

module.exports = {
    ROOMS_LIST,
    SOCKET_LIST,
    COLORS,
    User,
    Pin,
    Room,
    rng,
    getSocket,
    addSocket,
    removeSocket,
    getRoom,
    getRoomsForSelection,
    addRoom,
    removeRoom,
    updateRoom,
};
