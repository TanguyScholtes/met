import React from "react";

export default props => {
    return (
        <div className="leaderboard">
            <h2>{`Room : ${props.room.id}`}</h2>
            <ol>{props.generateLaederboard()}</ol>
        </div>
    );
};
