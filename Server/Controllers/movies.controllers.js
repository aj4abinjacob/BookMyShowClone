const { default: mongoose } = require("mongoose");
const MovieModel = require("../Models/Movie.model");

const getAllMovies = async (req, res) => {
    try{
        const allMovies = await MovieModel.find();
        if (!allMovies) {
            return res.status(404).json({ message: "No movies found" });
        }
        console.log("All movies fetched:", allMovies);
        return res.status(200).json({ message: "Movies fetched successfully", movies: allMovies });
    }catch(err){
        console.error("Error fetching movies:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const createNewMovie = async (req, res) => {
    try{
        console.log("Movie data:", req.body);
        const newMovie = MovieModel(req.body);
        const dbResponse = await newMovie.save();

        if (!dbResponse) {
            return res.status(500).json({ message: "Failed to create movie" });
        }
        console.log("New movie created:", dbResponse);

        return res.status(201).json({ message: "Movie created successfully", movie: newMovie });

    }catch(err){
        console.error("Error creating new movie:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const updateMovieById = async (req, res) => {
    const movieId = req.params.id;

    
   
    try{
        if(!mongoose.Types.ObjectId.isValid(movieId)){
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const upddatedMovie = await MovieModel.findByIdAndUpdate(movieId, req.body, { new: true });
        if (!upddatedMovie) {
            return res.status(500).json({ message: "Failed to update movie" });
        }
        console.log("Movie updated:", upddatedMovie);
        return res.status(200).json({ message: "Movie updated successfully", movie: upddatedMovie });
    }catch(err){
        console.error("Error updating movie:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteMovieById = async (req, res) => {
    const movieId = req.params.id;

    try{
        if(!mongoose.Types.ObjectId.isValid(movieId)){
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        console.log("Movie deleted:", deletedMovie);
        return res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });
    }catch(err){
        console.error("Error deleting movie:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    getAllMovies,
    createNewMovie,
    updateMovieById,
    deleteMovieById
}