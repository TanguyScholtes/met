import * as React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import Login from "./components/containers/Login";
import Game from "./components/containers/Game";

export default function App() {
    const [isGameOn, setGameOn] = React.useState(false);
    const [player, setPlayer] = React.useState("");
    const [room, setRoom] = React.useState("");

    if (!isGameOn) {
        return (
            <div className="main">
                <Login
                    setPlayer={setPlayer}
                    setGameOn={setGameOn}
                    setRoom={setRoom}
                />
            </div>
        );
    }
    return (
        <div className="main">
            <Game
                setPlayer={setPlayer}
                player={player}
                setRoom={setRoom}
                room={room}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
