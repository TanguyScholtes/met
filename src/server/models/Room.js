class Room {

    constructor ( name, playersNumber, host ) {
        this.id = name;
        this.maxTries = 10;
        this.combination = [];
        this.playersNumber = playersNumber;
        this.players = [];
        this.state = "waiting";
        /*
         * All states :
         * "waiting" - Await for playersNumber to be reached. Joining available
         * "pending" - Game is currently underway. No joining
         */

        this.players[ host.id ] = host;
    }
}

module.exports = { Room };
