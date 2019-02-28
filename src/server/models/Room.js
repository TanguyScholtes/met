const RULES = [
    {
        pinNumber: 4,
        maxTries: 10,
        colorNumber: 6,
    },
    {
        
        pinNumber: 5,
        maxTries: 10,
        colorNumber: 6,
    },
    {
        
        pinNumber: 6,
        maxTries: 10,
        colorNumber: 8,
    },
    {
        pinNumber: 6,
        maxTries: 8,
        colorNumber: 8,
    },
];

class Room {
    constructor(name, playersNumber, host) {
        this.id = name;
        this.maxTries = 10;
        this.combination = [];
        this.playersNumber = playersNumber;
        this.players = [];
        this.state = "waiting";
        this.rule = RULES[playersNumber-1];
        /*
         * All states :
         * "waiting" - Await for playersNumber to be reached. Joining available
         * "pending" - Game is currently underway. No joining
         */

        this.players.unshift(host);
    }

    displaySelection = () => {
        return {name: this.id, currentPlayers: this.players.length, maxPlayers: this.playersNumber};
    }

    getPlayer(pseudo) {
        return this.players.find(el => el.pseudo == pseudo);
    }
}

module.exports = {Room};
