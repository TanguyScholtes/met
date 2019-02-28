import * as React from "react";
import ReactDOM from "react-dom";
import * as socket from "../../socket";

export default props => {

    const constructLeaderboard = () => {
        let board = props.room.players;
        board.sort( ( a, b ) => {
            return a.score - b.score;
        } );

        return board;
    };

    let leaderboard = constructLeaderboard();


    const statusChange = feeling => {
        /*
        let currentUser = props.room.id;

        props.setPlayer( { status: feeling } );
        //props.setRoom( { players: players } );
        leaderboard = constructLeaderboard();
        */
    };


    return (
        <div>
            <h1>met&lt;/lide&gt;</h1>
            <div class="leaderboard">
                <h2>Room : {props.room.id}</h2>
                <ol>
                    { leaderboard.map( item => {
                        return <li><img src={item.status} /> { item.pseudo } {item.score}</li>;
                    } ) }
                </ol>
            </div>
            <div class="status-picker">
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" />
                </button>
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" />
                </button>
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" />
                </button>
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" />
                </button>
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" />
                </button>
                <button onClick={ statusChange( "http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" ) }>
                    <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" />
                </button>
            </div>
        </div>
    );
}
