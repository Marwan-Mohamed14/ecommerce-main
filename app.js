const express = require('express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const approutes = require('./routes/approutes'); // Importing the routes
const appcontroller = require('./controllers/appcontroller'); // Importing the controller

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the routes defined in approutes.js
app.use('/', approutes);
app.post('/signup', appcontroller.signup);

app.use('/JavaScript', express.static(path.join(__dirname, 'JavaScript')));

const mongoURI = 'mongodb+srv://Kal:123321123321@cluster0.uodoskc.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const existingIds = new Set();

function generateUniqueId() {
    let id;
    do {
        id = [...Array(32)].map(() => Math.random().toString(36)[2]).join('');
    } while (existingIds.has(id));
    existingIds.add(id);
    return id;
}

app.use(session({
    genid: (req) => uuidv4(),
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

class User {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id; 
    }
}

const arr = [new User('maged', 'maged', generateUniqueId())];

function search(id) {
    return arr.find(user => user.id === id) || null;
}

function manageSessions(req, set, res) {
    if (!req.session.user && arr.length !== 0) {
        console.log("new client connected");
        if (set) {
            req.session.user = generateUniqueId();
            arr.push(new User('someUser', 'somePassword', req.session.user));
            res.send('User added');
        } else {
            return req.session.user;
        }
    } else {
        let currentUser = search(req.session.user);
        if (currentUser) {
            console.log("reconnected", req.session.user);
            res.send('Welcome back ' + req.session.user);
            return req.session.user;
        }
    }
    return 'not found';
}


app.get('/maged', (req, res) => {
    manageSessions(req, true, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
