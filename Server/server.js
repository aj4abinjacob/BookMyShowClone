const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl).then(() => {
    console.log("MongoDB connected");
}
).catch((err) => {
    console.log("MongoDB connection error:", err);
}
);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);