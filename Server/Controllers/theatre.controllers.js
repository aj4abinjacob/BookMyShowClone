
const TheatreModel = require("../Models/Theatre.model");

const mongoose = require("mongoose");

const createTheatre = async (req, res) => {
    // console.log("Request", req);
    // console.log("Creating new theatre with data:", req.body);
    const theatreDetails = req.body;
    theatreDetails.owner = req.user._id;
    try {
        const newTheatre = new TheatreModel(theatreDetails);
        const dbResponse = await newTheatre.save();

        if (!dbResponse) {
            return res.status(500).json({ message: "Failed to create theatre" });
        }
        console.log("New theatre created:", dbResponse);

        return res.status(201).json({ message: "Theatre created successfully", theatre: newTheatre });

    } catch (err) {
        console.error("Error creating new theatre:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllTheatres = async (req, res) => {
    try {
        const theatres = await TheatreModel.find({}).populate("owner");
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