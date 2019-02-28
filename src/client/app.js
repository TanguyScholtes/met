import * as React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import Login from "./components/containers/Login";
import Game from "./components/containers/Game";

export default function App() {
    const [isGameOn, setGameOn] = React.useState(true);
    const [player, setPlayer] = React.useState( {
        id: 1234567890,
        pseudo: 'Lyanor',
        score: 0,
        hosted: 'Hamilton',
        status: 'http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif'
    } );
    const [room, setRoom] = React.useState( {
        id: 'Hamilton',
        maxTries: 10,
        combination: [],
        playersNumber: 2,
        players: [
            {
                id: 1234567890,
                pseudo: 'Lyanor',
                score: 0,
                hosted: 'Hamilton',
                status: 'http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif'
            },
            {
                id: 9876543210,
                pseudo: 'Anarion',
                score: 0,
                hosted: '',
                status: 'http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif'
            }
        ]
    } );

    if (!isGameOn) {
        return (
            <div className="main">
                <Login
                    setPlayer={setPlayer}
                    setGameOn={setGameOn}
                    setRoom={setRoom}
                />
            </div>
        );
    } else {
        return (
            <div className="main">
                <Game
                    player={player}
                    room={room}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

// import io from "socket.io-client";

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             socket: io(),
//         };
//     }

//     send = () => {
//         this.state.socket.emit("create_room", {
//             name: "Hamilton",
//             numbers: 2,
//         });
//     };

//     quit = () => {
//         this.state.socket.emit("join_room", {name: "Hamilton"});
//     };

//     login = () => {
//         this.state.socket.emit( "login", {
//             pseudo: "Lyanor"
//         } );
//     };

//     logout = () => {
//         this.state.socket.emit( "disconnect" );
//     };

//     getRoom = () => {
//         this.state.socket.emit( "get_room", { name: 'Hamilton' } );
//     };

//     getAllRooms = () => {
//         this.state.socket.emit( "get_all_rooms" );
//     };

//     generateCombination = () => {
//         this.state.socket.emit( "generate_combination", { name: 'Hamilton', number: 2 } );
//     }

//     updateEmoji = emoji => {
//         this.state.socket.emit( "update_emoji", { emoji: emoji, room: 'Hamilton' } );
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello World</h1>
//                 <button onClick={() => this.login()}>Login</button>
//                 <button onClick={this.getRoom}>get Room</button>
//                 <button onClick={this.getAllRooms}>get All Rooms</button>
//                 <button onClick={this.send}>Click me</button>
//                 <button onClick={this.quit}>Leave co</button>
//                 <button onClick={() => this.logout()}>Logout</button>
//                 <button onClick={() => this.generateCombination()}>generate combination</button>

//                 <div>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;happy.gif" />
//                     </button>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;0_o.gif" />
//                     </button>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;angry.gif" />
//                     </button>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;dizzy.gif" />
//                     </button>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;T_T.gif" />
//                     </button>
//                     <button onClick={() => this.updateEmoji( 'http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif' )}>
//                         <img src="http://www.zeldalegends.net/admin/style_emoticons/default/l;sweat.gif" />
//                     </button>
//                 </div>
