import * as React from "react";
import ReactDOM from "react-dom";
import "./scss/appStyle.scss";
import Pin from "./components/ColorPin";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Pin className="red small" />
                <Pin className="blue big" />
                <Pin className="yellow big" />
                <Pin className="blue big" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
