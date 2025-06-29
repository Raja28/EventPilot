const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    eventsCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    eventsJoined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]

});

// Hash password before saving to database 
userSchema.pre('save', async function (next) {
    // Hash password before saving
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;