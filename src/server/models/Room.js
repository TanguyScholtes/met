class Room {

    constructor ( name, playersNumber, host ) {
        this.id = name;
        this.maxTries = 10;
        this.combination = [];
        this.playersNumber = playersNumber;
        this.players = [];

        this.players[ host.id ] = host;
    }
}

module.exports = { Room };
