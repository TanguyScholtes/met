import React from "react";
import Form from "../dumnies/Form";
import io from "socket.io-client";

export default props => {
    const socket = io();

    const [joinRoom, setJoin] = React.useState(true);

    const joinRoomHandle = e => {
        e.preventDefault();
        props.setRoom(e.target.room.value);
        props.setPseudo(e.target.pseudo.value);
        props.setGameOn(true);
    };

    const changeMode = e => {
        e.preventDefault();
        setJoin(!joinRoom);
    };

    const createRoomHandle = e => {
        e.preventDefault();
    };

    // defining inputs to add in the form
    const inputs = [
        {
            type: "text",
            name: "pseudo",
            placeholder: "Pseudo",
        },
        {
            type: "text",
            name: "room",
            placeholder: "Room",
        },
        {
            type: "submit",
            name: "submit",
            value: "Join",
            className: "submit",
        },
    ];

    const playersNumbers = {
        type: "number",
        name: "maxPlayers",
        placeholder: "Max players (1-4)",
        min: 1,
        max: 4,
        step: 1,
        defaultValue: 1,
    };

    if (joinRoom) {
        return (
            <div className="loginComp">
                <div className="container">
                    <div className="slider">
                        <label>Join room</label>
                        <button onClick={changeMode} className="toggleSlider">
                            <span className="toggler" />
                        </button>
                        <label>Create room</label>
                    </div>
                    <h2>Join a room</h2>
                    <Form onSubmit={joinRoomHandle} inputs={inputs} />
                </div>
            </div>
        );
    } else {
        inputs.splice(2, 0, playersNumbers);
        inputs[3].value = "Create & join";
        return (
            <div className="loginComp">
                <div className="container">
                    <div className="slider">
                        <label>Join room</label>
                        <button
                            onClick={changeMode}
                            className="toggleSlider right">
                            <span className="toggler" />
                        </button>
                        <label>Create room</label>
                    </div>
                    <h2>Create room</h2>
                    <Form onSubmit={createRoomHandle} inputs={inputs} />
                </div>
            </div>
        );
    }
};