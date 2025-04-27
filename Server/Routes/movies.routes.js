const { getAllMovies, createNewMovie, updateMovieById, deleteMovieById, getMovieById } = require("../Controllers/movies.controllers");
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middlewares");

module.exports = (app) => {
    app.get("/movies", [verifyToken], getAllMovies);
    app.get("/movies/:id", [verifyToken], getMovieById);
    app.post("/movies", [verifyToken, verifyAdmin], createNewMovie);
    app.put("/movies/:id", [verifyToken, verifyAdmin], updateMovieById);
    app.delete("/movies/:id", [verifyToken, verifyAdmin], deleteMovieById);

}