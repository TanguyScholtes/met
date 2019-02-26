import * as React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import Login from "./components/constainers/Login";

export default function App() {
    const [isGameOn, setGameOn] = React.useState(false);
    const [pseudo, setPseudo] = React.useState("");
    const [room, setRoom] = React.useState("");

    if (!isGameOn) {
        return (
            <div className="main">
                <Login
                    setPseudo={setPseudo}
                    setGameOn={setGameOn}
                    setRoom={setRoom}
                />
            </div>
        );
    } else {
        return (
            <div className="main">
                <h1>
                    Welcome {pseudo} in {room} room
                </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
