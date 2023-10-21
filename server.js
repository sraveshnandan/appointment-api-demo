//loading environment variable
require("dotenv").config();
const connectToDb = require("./config/db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//Connecting to the database
connectToDb();

//Declaring the configuration for the server
const app = express();
const port = process.env.PORT || 5500;

//Cofiguring middlewares
app.use(express.json({ extended: true }));

app.use(
  cors({
    // Cross origin conf
    credentials: true,
    origin:"http://localhost:5173"
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
//Setting template engine
app.set("view engine", "ejs");
//Redering the index page

//Importing routes
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const userRoutes = require("./routes/userRoutes.js")

//using routes
app.use("", appointmentRoutes);
app.use("", userRoutes)


//Starting the server

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
