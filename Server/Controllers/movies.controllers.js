const getAllMovies = (req, res) => {
    return res.status(200).json({ message: "Get all movies" });
}

const createNewMovie = (req, res) => {
    return res.status(201).json({ message: "Create new movie" });
}

module.exports = {
    getAllMovies,
    createNewMovie
}