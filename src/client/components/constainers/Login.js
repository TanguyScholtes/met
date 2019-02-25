import React from "react";
import Form from "../dumnies/Form";

export default props => {
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
        },
    ];

    const playersNumbers = {
        type: "number",
        name: "maxPlayers",
        placeholder: "Max players (1-4)",
    };

    if (joinRoom) {
        return (
            <div className="loginComp">
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
        );
    } else {
        inputs.splice(2, 0, playersNumbers);
        return (
            <div className="loginComp">
                <div className="slider">
                    <label>Join room</label>
                    <button onClick={changeMode} className="toggleSlider right">
                        <span className="toggler" />
                    </button>
                    <label>Create room</label>
                </div>
                <h2>Create room</h2>
                <Form onSubmit={createRoomHandle} inputs={inputs} />
            </div>
        );
    }
};
