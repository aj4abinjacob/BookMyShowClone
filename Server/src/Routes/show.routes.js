const { getAllShows, createNewShow, getTheatersAndShowsByMovieId} = require("../Controllers/shows.controllers");
const { verifyToken, verifyAdminOrPartner } = require("../Middlewares/auth.middlewares");

module.exports = (app) => {
    

    app.get("/shows", [verifyToken], getAllShows);
    app.post("/shows", [verifyToken, verifyAdminOrPartner], createNewShow);
    app.get("/movies/:movieId/shows", [verifyToken], getTheatersAndShowsByMovieId);
}