const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const pool = require("./database/connection");
const mqtt = require('./mqtt');

const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/user", userRoute);
app.use("/message", messageRoute);

//esatblishing DB and Server connection
pool.connect(function (err, client, done) {
    if (err) {
        console.error("Unable to start server:", err);
        process.exit(1);
    } else {
        global.dbClient = client;//setting db connection as global variable
        app.listen(PORT, (err) => {
            if (err) {
                console.error("Unable to start server:", err);
                process.exit(1);
            } else {
                console.log("Server running on the port", PORT);
            }
        });
    }
}); 