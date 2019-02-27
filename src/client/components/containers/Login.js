import React from "react";
import Form from "../dummies/Form";
import * as socket from "../../socket";
import axios from "axios";

export default props => {
    const [joinRoom, setJoin] = React.useState(true);
    const [roomList, setList] = React.useState(undefined);

    if (!roomList) {
        axios
            .get("/rooms")
            .then(res => {
                setList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const joinRoomHandle = e => {
        e.preventDefault();
        props.setRoom(e.target.room.value);
        props.setPseudo(e.target.pseudo.value);
        props.setGameOn(true);
    };

    const changeModeHandle = e => {
        e.preventDefault();
        setJoin(!joinRoom);
    };

    const createRoomHandle = e => {
        e.preventDefault();

        socket.ask_createRoom({
            name: e.target.room.value,
            numbers: e.target.maxPlayers.value,
        });
    };

    const generateList = () => {
        if (!roomList) return;
        const list = [];
        roomList.forEach(elem => {
            list.push(<li>{elem}</li>);
        });
        return list;
    };

    socket.listen_createRoom(data => {
        if (!roomList && data.room) {
            setList([data.room.id]);
            return;
        }

        if (data.room) setList([...roomList, data.room.id]);
    });

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
                        <button
                            onClick={changeModeHandle}
                            className="toggleSlider">
                            <span className="toggler" />
                        </button>
                        <label>Create room</label>
                    </div>
                    <h2>Join a room</h2>
                    <div className="joinZone">
                        <Form onSubmit={joinRoomHandle} inputs={inputs} />
                        <ul className="roomList">{generateList()}</ul>
                    </div>
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
                            onClick={changeModeHandle}
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
