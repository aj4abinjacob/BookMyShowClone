const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
var bodyParser = require('body-parser');
// const mongooseSanitizer = require('express-mongo-sanitize');

var cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbUrl).then(() => {
    console.log("MongoDB connected");
}
).catch((err) => {
    console.log("MongoDB connection error:", err);
}
);

const limiter = rateLimit({
    windowMs: 5*1000, // 5 seconds
    max: 10, // 5 requests per windowMs
    message: {
        status:429,
        error: "Too many requests.",
        message: "Too many requests, please try again later."
    }
}
);
app.use(limiter);
// app.use(mongooseSanitizer({
//     replaceWith: '_'
// }));

// Simple MongoDB operator sanitizer
app.use((req, res, next) => {
    if (req.body) {
      const sanitize = (obj) => {
        for (const key in obj) {
          if (key.startsWith('$')) delete obj[key];
          else if (typeof obj[key] === 'object') sanitize(obj[key]);
        }
      };
      sanitize(req.body);
    }
    next();
  });


const authRoutes = require("./src/Routes/auth.routes");
const movieRoutes = require("./src/Routes/movies.routes");
const theatreRoutes = require("./src/Routes/theatre.routes");
const showRoutes = require("./src/Routes/show.routes");
const bookingRoutes = require("./src/Routes/booking.routes");

authRoutes(app);
movieRoutes(app);
theatreRoutes(app);
showRoutes(app);
bookingRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);