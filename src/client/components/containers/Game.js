import * as React from "react";
import * as socket from "../../socket";

export default props => {
    const [status, setStatus] = React.useState(
        "http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif",
    );

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
                <li key="1">
                    <img src={status} />
                    {item.pseudo} {item.score}
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
            <div className="leaderboard">
                <h2>{`Room : ${props.room.id}`}</h2>
                <ol>{generateLaederboard()}</ol>
            </div>
            <div className="status-picker">
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" />
                </button>
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" />
                </button>
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" />
                </button>
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" />
                </button>
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" />
                </button>
                <button
                    onClick={() => {
                        statusChange(
                            "http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif",
                        );
                    }}>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" />
                </button>
            </div>
        </div>
    );
};
