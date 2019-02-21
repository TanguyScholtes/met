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

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <button onClick={this.send}>Click me</button>
                <button onClick={this.quit}>Leave co</button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
