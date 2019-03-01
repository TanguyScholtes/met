import * as React from "react";
// import ReactDOM from "react-dom";
// import * as socket from "../../socket";

// {
//     leaderboard.map(item => {
//         return (
//             <li key="1">
//                 <img src={item.status} /> {item.pseudo} {item.score}
//             </li>
//         );
//     });
// }

export default props => {
    const constructLeaderboard = () => {
        let board = props.room.players;

        board.sort((a, b) => {
            return a.score - b.score;
        });
        return board;
    };

    let leaderboard = constructLeaderboard();

    const generateLaederboard = () => {
        leaderboard.map(item => {
            return (
                <li key="1">
                    <img src={item.status} />
                    {item.pseudo} {item.score}
                </li>
            );
        });
    };

    return (
        <div>
            <h1>{"met</lide>"}</h1>
            <div className="leaderboard">
                <h2>{`Room : ${props.room.id}`}</h2>
                <ol>{generateLaederboard()}</ol>
            </div>
        </div>
    );
    // const statusChange = feeling => {
    // socket.update_emoji({
    //     emoji: feeling,
    //     name: props.room.id,
    //     pseudo: props.player.pseudo,
    // });
    // socket.emoji_updated(data => {
    //     let currentRoom = props.room;
    //     try {
    //         currentRoom.players[
    //             currentRoom.players.findIndex(x => {
    //                 return x.pseudo === props.player.pseudo;
    //             })
    //         ] = data.player;
    //         console.log(currentRoom.players, props.player, data.player);
    //     } catch (error) {
    //         console.error(error);
    //         return;
    //     } finally {
    //         props.setRoom(currentRoom);
    //         console.log("roomr", props.room);
    //         leaderboard = constructLeaderboard();
    //     }
    //     return;
    // });
    // };
    // return (
    //     <div>
    //         <h1>{"met</lide>"}</h1>
    //         <div className="leaderboard">
    //             <h2>{"Room : ${props.room.id}"}</h2>
    //             <ol>
    //                 {leaderboard.map(item => {
    //                     return (
    //                         <li key="1">
    //                             <img src={item.status} /> {item.pseudo}{" "}
    //                             {item.score}
    //                         </li>
    //                     );
    //                 })}
    //             </ol>
    //         </div>
    //         <div className="status-picker">
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" />
    //             </button>
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" />
    //             </button>
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" />
    //             </button>
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" />
    //             </button>
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" />
    //             </button>
    //             <button
    //                 onClick={() => {
    //                     statusChange(
    //                         "http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif",
    //                     );
    //                 }}>
    //                 <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" />
    //             </button>
    //         </div>
    //     </div>
    // );
};
