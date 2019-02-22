import * as React from "react";
import ReactDOM from "react-dom";
import Login from "./components/constainers/Login";

export default function App() {
    const [isGameOn, setGameOn] = React.useState(false);
    const [pseudo, setPseudo] = React.useState("");
    const [room, setRoom] = React.useState("");

    if (!isGameOn) {
        return (
            <div>
                <h1>Not in game</h1>

                <Login
                    setPseudo={setPseudo}
                    setGameOn={setGameOn}
                    setRoom={setRoom}
                />
            </div>
        );
    } else {
        return (
            <div>
                <h1>
                    Welcome {pseudo} in {room} room
                </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
