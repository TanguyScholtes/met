const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {APP_PORT} = process.env || 5000;
const {ROOMS_LIST} = require("./models/Global");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/rooms", (req, res) => {
    res.send(ROOMS_LIST);
});

app.all("*", (req, res) => {
    res.json(ROOMS_LIST);
    res.sendFile(`${__dirname}../../client/index.html`);
});

http.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

const {SocketHandler} = require("./sockets/Socket");

io.sockets.on("connection", SocketHandler);
