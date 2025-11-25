require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const propertyManagementRoutes = require("./routes/propertyManagement.route");
const propertyListingRoutes = require("./routes/propertyListing.route");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}))

app.use("/nest/v1/auth",authRoutes);
app.use("/nest/v1/user",userRoutes);
app.use("/nest/v1/property",propertyManagementRoutes);
app.use("/nest/v1/listing",propertyListingRoutes);

module.exports = app;