const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({

    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    bookedSeats: {
        type: [String],
        default: [],
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Show = mongoose.model('Show', showSchema);
module.exports = Show;