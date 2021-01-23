const sequelize = require("./config/connection");
const express = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers.js')
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers })


const app = express();

const PORT = process.env.PORT || 3001
app.engine('handlebars', hbs.engine);
// alternately like this:
// app.engine('handlebars', exphbs({ can set defaultLayout and helpers here}));
app.set('view engine', 'handlebars');

// use session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});