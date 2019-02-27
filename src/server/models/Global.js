let ROOMS_LIST = [];
let SOCKET_LIST = [];

let {User} = require("./User");
let {Pin} = require("./Pin");
let {Room} = require("./Room");

const RULES = {
    1: {
        playersNumber: 1,
        pinNumber: 4,
        maxTries: 10,
        colorNumber: 6,
    },
    2: {
        playersNumber: 2,
        pinNumber: 5,
        maxTries: 10,
        colorNumber: 6,
    },
    3: {
        playersNumber: 3,
        pinNumber: 6,
        maxTries: 10,
        colorNumber: 8,
    },
    4: {
        playersNumber: 4,
        pinNumber: 6,
        maxTries: 8,
        colorNumber: 8,
    },
};

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

let rng = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    ROOMS_LIST,
    SOCKET_LIST,
    COLORS,
    RULES,
    User,
    Pin,
    Room,
    rng,
};
