const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// Create a new sequelize store using the express-session package
const SequelizeStore = rquire('conect-session-sequelize')(session.Store);

// Let app run on express
const app = express();
const PORT = process.env.PORT || 3001;

// set up the handlebars.js engine with custom helpers
const hbs = exhbs.create({ helpers });

// configure and link a session object with the sequelize store
const sess = {
    secret: 'Extremely Secrete session',
    cookie: {
        // cookie expires after 5 mins
        maxAge: 300000,
        // cookie is accessible only through http requests, not by client side javascript
        httpOnly: true,
        // cookie is allowed to be transmitted over nonsecure http connections
        secure: false,
        // cookie will be sent only for requests originating from the same site as the server
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// ise sesson object in the express app
app.use(session(sess));
// informing Express.js on which template engine to use
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// import all files of the public folder
app.use(express.static(path.join(__dirname, 'public')));
// import bootstrap to the app
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use(routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
})

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});