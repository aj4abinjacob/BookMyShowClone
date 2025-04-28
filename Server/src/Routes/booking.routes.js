const { makePayment } = require("../Controllers/booking.controllers")
const { verifyToken } = require("../Middlewares/auth.middlewares")

module.exports = (app) => {
    app.post("/payment",[verifyToken], makePayment)
}