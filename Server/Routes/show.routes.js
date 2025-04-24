const { getAllShows, createNewShow} = require("../Controllers/shows.controllers");
const { verifyToken, verifyAdminOrPartner } = require("../Middlewares/auth.middlewares");

module.exports = (app) => {
    

    app.get("/shows", [verifyToken], getAllShows);
    app.post("/shows", [verifyToken, verifyAdminOrPartner], createNewShow);
    // app.put("/theatres/:id", [verifyToken, verifyAdmin], updateTheatreById);
    // app.delete("/theatres/:id", [verifyToken, verifyAdmin], deleteTheatreById);
}