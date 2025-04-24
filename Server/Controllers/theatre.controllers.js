
const TheatreModel = require("../Models/Theatre.model");
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middlewares");

const mongoose = require("mongoose");

const createTheatre = async (req, res) => {
    console.log("Creating new theatre with data:", req.body);
}

const getAllTheatres = async (req, res) => {
    try {
        const theatres = await TheatreModel.find();
        if (!theatres || theatres.length === 0) {
            return res.status(404).json({ message: "No theatres found" });
        }
        console.log("Theatres retrieved:", theatres);
        return res.status(200).json({ message: "Theatres retrieved successfully", theatres });
    } catch (err) {
        console.error("Error retrieving theatres:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    createTheatre,
    getAllTheatres,
}