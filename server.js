const sequelize = require("./config/connection");
const express = require("express");
const routes = require("./controllers");
const helpers = require("./utils/helpers.js");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "aywtd?inshfy?283",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // stores the new session to the database exported in config/connection
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();

const PORT = process.env.PORT || 3001;
app.engine("handlebars", hbs.engine);
// alternately like this:
// app.engine('handlebars', exphbs({ can set defaultLayout and helpers here}));
app.set("view engine", "handlebars");

// use session
app.use(session(sess));
// middleware for post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use static files in public
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// initialize connection to the database then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
