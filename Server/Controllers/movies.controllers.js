const getAllMovies = (req, res) => {
    return res.status(200).json({ message: "Get all movies" });
}

module.exports = {
    getAllMovies
}