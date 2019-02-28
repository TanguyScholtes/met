class Room {

    constructor ( name, playersNumber, host ) {
        this.id = name;
        this.maxTries = 10;
        this.combination = [];
        this.playersNumber = playersNumber;
        this.players = {};

        let host_id = host.id;
        this.players.host_id = host;
    }
}

module.exports = { Room };
