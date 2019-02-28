const {ROOMS_LIST, SOCKET_LIST, Room} = require("../models/Global");

const RoomsHandler = socket => {
    socket.on("create_room", data => {
        if (ROOMS_LIST[data.name]) {
            let message = `${ROOMS_LIST[data.name]} already exists`;
            console.error("create_room", message);
            let error = new Error(message);
            socket.emit("create_room_event", {error: error});
            return error;
        } else if (
            !data.name ||
            typeof data.name != "string" ||
            data.name === ""
        ) {
            let message = "Name invalid. Cannot create room";
            console.error("create_room", message);
            let error = new Error(message);
            socket.emit("create_room_event", {error: error});
            return error;
        } else {
            let room = new Room(
                data.name,
                data.numbers,
                SOCKET_LIST[socket.id],
            );
            SOCKET_LIST[socket.id].hosted = room.id;
            ROOMS_LIST[room.id] = room;
            console.log("create_room", room);
            socket.emit("create_room_event", {room: room});
            return room;
        }
    });

    socket.on("join_room", data => {
        if (
            ROOMS_LIST[data.name] &&
            ROOMS_LIST[data.name].players.length <
                ROOMS_LIST[data.name].playersNumber &&
            ROOMS_LIST[data.name].state === "waiting"
        ) {
            // room exists & has available slots & is joinable

            // Add user to room
            ROOMS_LIST[data.name].players[socket.id] = SOCKET_LIST[socket.id];

            // If joining user fills the romm to desired number, switch room state
            if (
                ROOMS_LIST[data.name].players.length ===
                ROOMS_LIST[data.name].playersNumber
            ) {
                ROOMS_LIST[data.name].state = "pending";
            }

            // Send room with new user added
            console.log("join_room", ROOMS_LIST[data.name]);
            socket.emit("join_room_event", {room: ROOMS_LIST[data.name]});
            return ROOMS_LIST[data.name];
        } else {
            let message = `Room ${
                data.name
            } is full, a game in underway or room does not exists`;
            console.error("join_room", message);
            let error = new Error(message);
            socket.emit("join_room_event", {error: error});
            return error;
        }
    });

    socket.on("get_room", data => {
        if (ROOMS_LIST[data.name]) {
            console.log("get_room", ROOMS_LIST[data.name]);
            socket.emit("get_room_event", {room: ROOMS_LIST[data.name]});
            return ROOMS_LIST[data.name];
        } else {
            let message = `No room with name ${data.name}`;
            console.error("get_room", message);
            let error = new Error(message);
            socket.emit("get_room_event", {error: error});
            return error;
        }
    });

    socket.on("get_all_rooms", () => {
        if (ROOMS_LIST.length >= 0) {
            console.log("get_all_rooms", ROOMS_LIST);
            socket.emit("get_all_rooms_event", {rooms: ROOMS_LIST});
            return ROOMS_LIST;
        } else {
            let message = `No room to display`;
            console.error("get_all_rooms", message);
            let error = new Error(message);
            socket.emit("get_all_rooms_event", {error: error});
            return error;
        }
    });
};

module.exports = {RoomsHandler};
