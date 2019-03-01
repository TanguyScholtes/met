const {
    ROOMS_LIST,
    getRoom,
    addRoom,
    getRoomsForSelection,
    Room,
    User,
} = require("../models/Global");

const roomsHandler = socket => {
    socket.on("create_room", data => {
        let errorMsg;

        if (getRoom(data.name)) {
            errorMsg = `${getRoom(data.name).id} already exists`;
        } else if (
            !data.name ||
            typeof data.name != "string" ||
            data.name === ""
        ) {
            errorMsg = "Name invalid. Cannot create room";
        } else if (
            !data.pseudo ||
            typeof data.pseudo != "string" ||
            data.pseudo === ""
        ) {
            errorMsg = "Pseudo invalid. Cannot create room";
        } else if (
            !data.numbers ||
            typeof data.numbers != "number" ||
            data.numbers < 1 ||
            data.numbers > 4
        ) {
            errorMsg = "Players number invalid. Cannont create room";
        } else {
            let room = new Room(data.name, data.numbers, new User(data.pseudo));

            addRoom(room);
            console.log("create_room", room);
            socket.emit("create_room_event", {room: room});
            socket.emit("join_room_event", {
                room: getRoom(data.name),
            });
            return;
        }

        console.log("create_room", errorMsg);
        socket.emit("create_room_event", {error: new Error(errorMsg)});
        return;
    });

    socket.on("join_room", data => {
        if (
            getRoom(data.name) &&
            getRoom(data.name).players.length <
                getRoom(data.name).playersNumber &&
            getRoom(data.name).state === "waiting"
        ) {
            // room exists & has available slots & is joinable
            // Add user to room
            getRoom(data.name).players.push(new User(data.pseudo));

            // If joining user fills the romm to desired number, switch room state
            if (
                getRoom(data.name).players.length ===
                getRoom(data.name).playersNumber
            ) {
                getRoom(data.name).state = "pending";
            }

            // Send room with new user added
            console.log("join_room", getRoom(data.name));
            socket.emit("join_room_event", {
                room: getRoom(data.name),
            });
            return;
        }

        let message = `Room ${
            data.name
        } is full, a game in underway or room does not exists`;

        console.error("join_room", message);
        socket.emit("join_room_event", {error: new Error(message)});
        return;
    });

    socket.on("get_room", data => {
        if (getRoom(data.name)) {
            console.log("get_room", getRoom(data.name));
            socket.emit("get_room_event", {
                room: getRoom(data.name),
            });
            return getRoom(data.name);
        }
        let message = `No room with name ${data.name}`;

        console.error("get_room", message);
        const error = new Error(message);

        socket.emit("get_room_event", {error: error});
        return error;
    });

    socket.on("get_all_rooms", () => {
        if (ROOMS_LIST.length >= 0) {
            console.log("get_all_rooms_format", getRoomsForSelection());
            socket.emit("get_all_rooms_event", {
                rooms: getRoomsForSelection(),
            });
            return;
        }

        let message = `No room to display`;

        console.error("get_all_rooms", message);
        socket.emit("get_all_rooms_event", {error: new Error(message)});
        return;
    });
};

module.exports = {roomsHandler};
