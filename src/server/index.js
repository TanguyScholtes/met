const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { APP_PORT } = process.env || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`)
);
