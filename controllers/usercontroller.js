const bcrypt = require('bcrypt');
const User = require('../models/users'); // Ensure this is the correct path to your User model

// user-management.js (Controller)

exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users using await
        const users = await User.find();
        
        // Render the 'ManageUsers' template with the users data
        res.render('ManageUsers', { users });
    } catch (error) {
        // Handle any errors that occur during the fetching or rendering process
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error: ' + error.message);
    }
};
;

exports.signup = (req, res) => {
    const { username, email, password, type } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Default to 'User' if no type is provided
    const userType = type || 'User';

    // Check if the user already exists
    User.findOne({ Email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send('User already exists');
            }

     
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
          
                    const newUser = new User({
                        Username: username,
                        Email: email,
                        Password: hashedPassword,
                        Type: userType // Save the user type
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


exports.login = (req, res, next) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Check if the user exists
    User.findOne({ Email: email })
        .then(user => {
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }

            // Check if the password is correct
            return bcrypt.compare(password, user.Password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).send('Invalid email or password');
                    }

                    // Set session and move to next middleware
                    req.session.userId = user._id;
                    next();
                });
        })
        .catch(error => {
            console.error('Error logging in user:', error);
            res.status(500).send('Internal server error: ' + error.message);
        });
};
exports.addUser = (req, res) => {
    const { username, email, password, type } = req.body;

    // Validate input fields
    if (!username || !email || !password || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    User.findOne({ Email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    // Create a new user
                    const newUser = new User({
                        Username: username,
                        Email: email,
                        Password: hashedPassword,
                        Type: type,
                    });

                    newUser.save()
                        .then(() => {
                            res.status(201).json({ message: 'User created successfully' });
                        })
                        .catch(error => {
                            console.error('Error creating user:', error);
                            res.status(500).json({ message: 'Internal server error: ' + error.message });
                        });
                })
                .catch(error => {
                    console.error('Error hashing password:', error);
                    res.status(500).json({ message: 'Internal server error: ' + error.message });
                });
        })
        .catch(error => {
            console.error('Error checking user:', error);
            res.status(500).json({ message: 'Internal server error: ' + error.message });
        });
};

// Function to handle user logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal server error');
        }
        res.redirect('/login');
    });
};

// Function to handle updating user details
exports.updateUser = (req, res) => {
    const { userId, username, email, password, type } = req.body;

    if (!userId || !username || !email || !type) {
        return res.status(400).send('All fields are required');
    }

    // Find user by ID
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            // Update user details
            user.Username = username;
            user.Email = email;
            user.Type = type;

            if (password) {
                // Hash the new password if provided
                return bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        user.Password = hashedPassword;
                        return user.save();
                    });
            } else {
                return user.save();
            }
        })
        .then(() => {
            res.status(200).send('User updated successfully');
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.status(500).send('Internal server error: ' + error.message);
        });
};


// Function to handle deleting a user
// Function to handle deleting a user
exports.deleteUser = (req, res) => {
    const { userId } = req.params;

    console.log('Deleting user with ID:', userId); // Debugging

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    User.findByIdAndDelete(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            console.log('User deleted:', user); // Debugging
            res.status(200).send('User deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting user:', error); // Debugging
            res.status(500).send('Internal server error: ' + error.message);
        });
};
