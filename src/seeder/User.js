"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var User = require('../models/User');
var _a = require("./config/index"), MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_IP = _a.MONGO_IP, MONGO_PORT = _a.MONGO_PORT, MONGO_DBNAME = _a.MONGO_DBNAME, PORT = _a.PORT;
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;
var dbURL = "mongodb://localhost:27017/runbackDB";
mongoose_1["default"].connect(dbURL);
// mongoose.connect(dbURL);
var conSuccess = mongoose_1["default"].connection;
conSuccess.once('open', function (_) {
    console.log('Database connected:', dbURL);
});
var users = [
    new User({
        name: "test1",
        email: "test1@gmail.com",
        password: "aaa",
        created_on: new Date
    }),
    new User({
        name: "test2",
        email: "test2@gmail.com",
        password: "aaa",
        created_on: new Date
    })
];
var done = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function (err, result) {
        console.log("saved");
        done++;
        if (done === users.length) {
            exit();
        }
    });
}
function exit() {
    mongoose_1["default"].disconnect();
}
