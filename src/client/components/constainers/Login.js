import React from "react";
import Form from "../dumnies/Form";

export default props => {
    const joinRoomHandle = e => {
        e.preventDefault();
        props.setRoom(e.target.room.value);
        props.setPseudo(e.target.pseudo.value);
        props.setGameOn(true);
    };

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

    return (
        <div className="loginComp">
            <Form onSubmit={joinRoomHandle} inputs={inputs} />
        </div>
    );
};
