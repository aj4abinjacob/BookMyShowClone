const { getAllMovies, createNewMovie } = require("../Controllers/movies.controllers");
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middlewares");

module.exports = (app) => {
    app.get("/movies", [verifyToken], getAllMovies);
    app.post("/movies", [verifyToken, verifyAdmin], createNewMovie);

}