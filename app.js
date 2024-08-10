const express = require('express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // Add multer for file uploads
const app = express();
const port = 8000;
const approutes = require('./routes/approutes'); // Importing the routes
const productRoutes = require('./routes/productsroutes');
const userRoutes = require('./routes/userroutes');
const carttRoutes = require('./routes/cartroutes');

// Middleware setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/Pictures/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use('/Pictures', express.static(path.join(__dirname, 'public/Pictures')));


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

// Routes
app.use('/', approutes); // Routes that include authentication logic
app.use('/products', productRoutes); // Routes for products
app.use('/users', userRoutes); // Routes for users
app.use(carttRoutes);

// MongoDB connection
const mongoURI = 'mongodb+srv://Kal:123321123321@cluster0.uodoskc.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
