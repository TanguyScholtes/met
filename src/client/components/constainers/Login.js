import React from "react";
import Form from "../dumnies/Form";

export default props => {
    const joinRoomHandle = e => {
        e.preventDefault();
        // props.setRoom(e.target.room.value);
        // props.setPseudo(e.target.pseudo.value);
        props.setRoom("Some Room");
        props.setPseudo("Anarion");
        props.setGameOn(true);
    };

    return (
        <div className="loginComp">
            <Form onSubmit={joinRoomHandle} />
        </div>
    );
};
