require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}))
app.use(cookieParser());

app.use("/nest/v1/auth",authRoutes);
app.use("/nest/v1/user",userRoutes);

module.exports = app;