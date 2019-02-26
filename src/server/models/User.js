class User {

    constructor ( number, string ) {
        this.id = number;
        this.pseudo = string;
        this.score = 0;
        this.hosted = '';
        this.status = 'http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif';
    }
}

module.exports = { User };
