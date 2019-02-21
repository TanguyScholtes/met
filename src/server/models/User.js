class User {

    constructor ( number, string ) {
        this.id = number;
        this.pseudo = string;
        this.score = 0;
        this.hosted = '';
    }
}

module.exports = { User };
