let {COLORS, Pin, rng, updateRoom, getRoom} = require("../models/Global");

const gameHandler = socket => {
    socket.on("generate_combination", data => {
        let message;

        if (!data.name) {
            message = "Missing room name and/or number of players";
        }

        if (getRoom(data.name) && !message) {
            let room = getRoom(data.name);

            for (let i = 0; i < room.rule.pinNumber; i++) {
                room.combination.push(
                    new Pin(COLORS[rng(0, room.rule.colorNumber - 1)]),
                );
            }
            updateRoom(room);

            console.log("generate_combination", room.combination);
            socket.emit("generate_combination_event", {
                combination: room.combination,
            });
            return;
        }
        message = "Room not found. Impossible to generate combination.";

        console.error("generate_combination", message);
        socket.emit("generate_combination_event", {error: new Error(message)});
    });

    socket.on("submit_combination", data => {
        if (!data.combination || !data.name) {
            let message = "Missing room name and/or combination";

            console.error("submit-combination", message);
            const error = new Error(message);

            socket.emit("submit_combination_event", {error: error});
            return error;
        }

        // get user's submitted combination
        let userCombination = [];

        data.combination.forEach(color => {
            userCombination.push(new Pin(color));
        });
        // compare room's combination & user's submitted combination
        if (getRoom(data.name).combination === userCombination) {
            console.log("You won. GG WP !");
            socket.emit("submit_combination_event", {
                success: "You won. GG WP !",
            });
            return;
        }

        // hints - based on ponderation
        // Each user-submitted element get a ponderation based on comparison with server-side combination elements :
        // + 2 for good color & position
        // + 1 for good color but wrong position
        // + 0 for wrong color
        // We keep only the highest ponderation for each pin, thus a match won't become a misplaced
        for (let i = 0; i < getRoom(data.name).combination.length; i++) {
            for (let j = 0; j < userCombination.length; j++) {
                if (
                    getRoom(data.name).combination[i].color ===
                        userCombination[j].color &&
                    i === j
                ) {
                    // good color & good position => get green (2)
                    userCombination[j].hint = 2;
                } else if (
                    getRoom(data.name).combination[i].color ===
                        userCombination[j].color &&
                    i !== j
                ) {
                    // good color, wrong position => orange (1)
                    if (userCombination[j].hint < 1) {
                        userCombination[j].hint = 1;
                    }
                }
                // wrong color => red (0) / default value, not modif needed
            }
        }

        // return hints about user's combination
        console.log("submit-combination", userCombination);
        socket.emit("submit_combination_event", {hints: userCombination});
        return;
    });
};

module.exports = {gameHandler};
