const sequelize = require("./config/connection");
const express = require('express');
const routes = require('./controllers');
// const path = require('path');


const app = express();

const PORT = process.env.PORT || 3001
// handlebars engine
// handlebars set 

// use session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});