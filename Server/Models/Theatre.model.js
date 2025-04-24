const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });
const TheatreModel = mongoose.model('theatre', theatreSchema);
module.exports = TheatreModel;