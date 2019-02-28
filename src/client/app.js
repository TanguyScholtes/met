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
            numbers: 1,
            pseudo: "Lyanor"
        });
    };

    quit = () => {
        this.state.socket.emit("join_room", {name: "Hamilton"});
    };

    logout = () => {
        this.state.socket.emit("disconnect");
    };

    getRoom = () => {
        this.state.socket.emit("get_room", {name: "Hamilton"});
    };

    getAllRooms = () => {
        this.state.socket.emit("get_all_rooms");
    };

    generateCombination = () => {
        this.state.socket.emit("generate_combination", {
            name: "Hamilton",
            number: 2,
        });
    };

    updateEmoji = emoji => {
        this.state.socket.emit("update_emoji", {
            emoji: emoji,
            name: "Hamilton",
            pseudo: "Lyanor"
        });
    };

    submitCombination = () => {
        const combination = ["yellow", "blue", "red", "green", "white"];
        this.state.socket.emit("submit_combination", {
            combination: combination,
            name: "Hamilton",
        });
    };

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <button onClick={this.getRoom}>get Room</button>
                <button onClick={this.getAllRooms}>get All Rooms</button>
                <button onClick={this.send}>Create Room</button>
                <button onClick={this.quit}>Leave co</button>
                <button onClick={() => this.logout()}>Logout</button>
                <button onClick={() => this.generateCombination()}>
                    generate combination
                </button>

                <div>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" />
                    </button>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" />
                    </button>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" />
                    </button>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" />
                    </button>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" />
                    </button>
                    <button
                        onClick={() =>
                            this.updateEmoji(
                                "http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif",
                            )
                        }>
                        <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" />
                    </button>
                </div>

                <button onClick={() => this.submitCombination()}>
                    submit combination
                </button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
