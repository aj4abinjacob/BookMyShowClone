
const ShowModel = require("../Models/Show.model");
const TheatreModel = require("../Models/Theatre.model");


const createNewShow = async (req, res) => {
    console.log(req.body);
    
    
    try{
        const {theatre, moview} = req.body;
        const theatreString = await TheatreModel.findById(theatre);
        console.log("Theatre ID:", theatreString);
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }
        const newShow = new ShowModel(req.body);
        const dbResponse = await newShow.save();
        if (!dbResponse) {
            return res.status(500).json({ message: "Failed to create show" });
        }
        console.log("New show created:", dbResponse);
        return res.status(201).json({ message: "Show created successfully", show: newShow });
    }catch(err){
        console.error("Error creating new show:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllShows = async(req, res) => {
    try{
        const allShows = await ShowModel.find().populate("theatre").populate("movie");
        if (!allShows) {
            return res.status(404).json({ message: "No shows found" });
        }
        console.log("All shows fetched:", allShows);
        return res.status(200).json({ message: "Shows fetched successfully", shows: allShows });    
    }catch(err){
        console.error("Error fetching shows:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
    // const allShows = await ShowModel.find();

}

module.exports = {
    createNewShow,
    getAllShows,
}