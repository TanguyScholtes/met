import * as React from "react";
import * as socket from "../../socket";
import emotes from "../../data/emotes.json";
import LeaderBoard from "../dummies/LeaderBoard";

export default props => {
    const [status, setStatus] = React.useState(emotes.happy);

    const constructLeaderboard = () => {
        const board = props.room.players;

        board.sort((a, b) => {
            return a.score - b.score;
        });
        return board;
    };

    let leaderboard = constructLeaderboard();

    const generateLaederboard = () => {
        const list = [];

        leaderboard.forEach(item => {
            list.push(
                <li key={item.pseudo}>
                    <img src={status} /> {` - ${item.pseudo}`} {item.score}
                </li>,
            );
        });
        return list;
    };

    const statusChange = feeling => {
        socket.update_emoji({
            emoji: feeling,
            name: props.room.id,
            pseudo: props.player.pseudo,
        });
    };

    socket.emoji_updated(data => {
        setStatus(data.player.status);
    });

    return (
        <div>
            <h1>{"met</lide>"}</h1>
            <LeaderBoard
                generateLaederboard={generateLaederboard}
                room={props.room}
            />
            <div className="status-picker">
                <button
                    onClick={() => {
                        statusChange(emotes.hangry);
                    }}>
                    <img src={emotes.hangry} />
                </button>
                <button
                    onClick={() => {
                        statusChange(emotes.sad);
                    }}>
                    <img src={emotes.sad} />
                </button>
                <button
                    onClick={() => {
                        statusChange(emotes.dizzy);
                    }}>
                    <img src={emotes.dizzy} />
                </button>
                <button
                    onClick={() => {
                        statusChange(emotes.happy);
                    }}>
                    <img src={emotes.happy} />
                </button>
                <button
                    onClick={() => {
                        statusChange(emotes.chocked);
                    }}>
                    <img src={emotes.chocked} />
                </button>
                <button
                    onClick={() => {
                        statusChange(emotes.sweat);
                    }}>
                    <img src={emotes.sweat} />
                </button>
            </div>
        </div>
    );
};
