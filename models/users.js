
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        Username: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: false

        },
        Password: {
            type: String,
            required: false

        },
        
        image: {
            type: String,
            required: false

        },
    },
{
    Timestamp: true
}
);
const User = mongoose.model("User", UserSchema);
module.exports = User;