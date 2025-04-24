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
    console.log("Update movie data:", req.body);
    return res.status(200).json({ message: "Movie updated successfully" });
}

module.exports = {
    getAllMovies,
    createNewMovie,
    updateMovieById
}