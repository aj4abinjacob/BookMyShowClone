const mongoose = require('mongoose');
const { setMaxListeners } = require('./Show.model');

const bookingSchema = new mongoose.Schema({
    show:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seats:{
        type: [String],
        required: true
    },
    transactionId:{
        type: String,
        required: true
    }
})

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;

