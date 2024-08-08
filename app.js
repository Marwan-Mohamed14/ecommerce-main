const express = require('express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();


const port = 8000;
const approutes = require('./routes/approutes'); // Importing the routes
const appcontroller = require('./controllers/usercontroller'); // Importing the controller
const productRoutes = require('./routes/productsroutes');
const User = require('./models/users'); // Import your User model for MongoDB


app.use('/Pictures', express.static(path.join(__dirname, 'Pictures')));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/JavaScript', express.static(path.join(__dirname, 'JavaScript')));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware setup
app.use(session({
    genid: (req) => uuidv4(),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Import and use routes
app.use('/', approutes);
app.post('/signup', appcontroller.signup);
app.use('/', productRoutes);
app.use('/api/products', productRoutes); // Use the correct prefix for product routes



// MongoDB connection
const mongoURI = 'mongodb+srv://Kal:123321123321@cluster0.uodoskc.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



app.get('/maged', (req, res) => {
    manageSessions(req, true, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
