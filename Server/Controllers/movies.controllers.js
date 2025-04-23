const MovieModel = require("../Models/Movie.model");

const getAllMovies = (req, res) => {
    return res.status(200).json({ message: "Get all movies" });
}

const createNewMovie = async (req, res) => {
    try{
        console.log("Movie data:", req.body);
        const newMovie = MovieModel(req.body);
        await newMovie.save();

        return res.status(201).json({ message: "Movie created successfully", movie: newMovie });

    }catch(err){
        console.error("Error creating new movie:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = {
    getAllMovies,
    createNewMovie
}