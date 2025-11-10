require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}))
app.use(cookieParser());

module.exports = app;