import * as React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io(),
        };
    }

    send = () => {
        this.state.socket.emit("create_room", {
            name: "Hamilton",
            numbers: 2,
        });
    };

    quit = () => {
        this.state.socket.emit("join_room", {name: "Hamilton"});
    };

    login = () => {
        this.state.socket.emit( "login", {
            pseudo: "Lyanor"
        } );
    };

    logout = () => {
        this.state.socket.emit( "disconnect" );
    };

    getRoom = () => {
        this.state.socket.emit( "get_room", { name: 'Hamilton' } );
    };

    getAllRooms = () => {
        this.state.socket.emit( "get_all_rooms" );
    };

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={this.getRoom}>get Room</button>
                <button onClick={this.getAllRooms}>get All Rooms</button>
                <button onClick={this.send}>Click me</button>
                <button onClick={this.quit}>Leave co</button>
                <button onClick={() => this.logout()}>Logout</button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
