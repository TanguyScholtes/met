let {ROOMS_LIST, RULES, COLORS, Pin, rng} = require("../models/Global");

const GameHandler = socket => {
    socket.on("generate_combination", data => {
        if (!data.name) {
            let message = "Missing room name and/or number of players";
            console.error("generate_combination", message);
            let error = new Error(message);
            socket.emit("generate_combination_event", {error: error});
            return error;
        }

        if (ROOMS_LIST[data.name]) {
            ROOMS_LIST[data.name].combination = [];
            const roomRule = RULES[ROOMS_LIST[data.name].playersNumber];

            console.log(roomRule);

            for (let i = 0; i < roomRule.pinNumber; i++) {
                ROOMS_LIST[data.name].combination.push(
                    new Pin(COLORS[rng(0, roomRule.colorNumber - 1)]),
                );
            }

            console.log(
                "generate_combination",
                ROOMS_LIST[data.name].combination,
            );
            socket.emit("generate_combination_event", {
                combination: ROOMS_LIST[data.name].combination,
            });
            return ROOMS_LIST[data.name].combination;
        }
    });

    socket.on("submit_combination", data => {
        if (!data.combination || !data.room) {
            let message = "Missing room name and/or combination";
            console.error("submit-combination", message);
            let error = new Error(message);
            socket.emit("submit_combination_event", {error: error});
            return error;
        }

        // get user's submitted combination
        let userCombination = [];
        data.combination.forEach(color => {
            userCombination.push(new Pin(color));
        });
        // compare room's combination & user's submitted combination
        if (ROOMS_LIST[data.room].combination === userCombination) {
            console.log("You won. GG WP !");
            socket.emit("submit_combination_event", {
                success: "You won. GG WP !",
            });
            return "You won. GG WP !";
        }

        // hints - based on ponderation
        // Each user-submitted element get a ponderation based on comparison with server-side combination elements :
        // + 2 for good color & position
        // + 1 for good color but wrong position
        // + 0 for wrong color
        // We keep only the highest ponderation for each pin, thus a match won't become a misplaced
        for (let i = 0; i < ROOMS_LIST[data.room].combination.length; i++) {
            for (let j = 0; j < userCombination.length; j++) {
                if (
                    ROOMS_LIST[data.room].combination[i].color ===
                        userCombination[j].color &&
                    i === j
                ) {
                    // good color & good position => get green (2)
                    userCombination[j].hint = 2;
                } else if (
                    ROOMS_LIST[data.room].combination[i].color ===
                        userCombination[j].color &&
                    i != j
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
        return userCombination;
    });
};

module.exports = {GameHandler};
