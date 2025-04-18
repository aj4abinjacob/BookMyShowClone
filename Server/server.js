const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbUrl).then(() => {
    console.log("MongoDB connected");
}
).catch((err) => {
    console.log("MongoDB connection error:", err);
}
);

const authRoutes = require("./Routes/auth.routes");
authRoutes(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);