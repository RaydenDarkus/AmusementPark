const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserN : {
        type: String,
        required: true
    },
    UserE : {
        type: String,
        unique: true,
        required: true
    },
    NPassword : {
        type: String,
        required: true
    },
    CPassword : {
        type: String,
        required: true
    }
})

const userCollection = new mongoose.model('usercollection', userSchema);

module.exports = userCollection;