const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.signup = (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Check if the user already exists
    User.findOne({ Email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send('User already exists');
            }

            // Hash the password
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    // Create a new user
                    const newUser = new User({
                        Username: username,
                        Email: email,
                        Password: hashedPassword
                    });

                    newUser.save()
                        .then(() => {
                            res.status(201).send('User created successfully');
                        })
                        .catch(error => {
                            console.error('Error creating user:', error);
                            res.status(500).send('Internal server error: ' + error.message);
                        });
                })
                .catch(error => {
                    console.error('Error hashing password:', error);
                    res.status(500).send('Internal server error: ' + error.message);
                });
        })
        .catch(error => {
            console.error('Error checking user:', error);
            res.status(500).send('Internal server error: ' + error.message);
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    User.findOne({ Email: email })
        .then(user => {
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }

            // Check if the password is correct
            bcrypt.compare(password, user.Password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).send('Invalid email or password');
                    }

                    // Log the user in (for example, create a session)
                    req.session.userId = user._id;
                    res.status(200).send('Logged in successfully');
                })
                .catch(error => {
                    console.error('Error comparing passwords:', error);
                    res.status(500).send('Internal server error: ' + error.message);
                });
        })
        .catch(error => {
            console.error('Error checking user:', error);
            res.status(500).send('Internal server error: ' + error.message);
        });
};
