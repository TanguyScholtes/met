import * as React from "react";
import ReactDOM from "react-dom";
import Pin from "./components/ColorPin";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Pin />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
