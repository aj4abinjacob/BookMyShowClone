const { getAllTheatres, createTheatre} = require("../Controllers/theatre.controllers");
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middlewares");

module.exports = (app) => {
    

    app.get("/theatres", [verifyToken], getAllTheatres);
    app.post("/theatres", [verifyToken, verifyAdmin], createTheatre);
    // app.put("/theatres/:id", [verifyToken, verifyAdmin], updateTheatreById);
    // app.delete("/theatres/:id", [verifyToken, verifyAdmin], deleteTheatreById);
}