const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
require("dotenv").config();

const app = express();

//Helpers
const checkAuth = require("./helpers/auth").checkAuth;

//DB Connection
const conn = require("./db/conn");

//Models
const User = require("./models/User");

//Routes

//Controllers

//Setting View Engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//Setting form reader
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(
    session({
        name: "session",
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require("path").join(require("os").tmpdir(), "sessions"),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        },
    })
);

app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

conn.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch((err) => {
        console.log(err);
    });
