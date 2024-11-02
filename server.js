const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const lendRoutes = require("./routes/lendRoutes");
const helmet = require('helmet'); 
const morgan = require('morgan');
const path = require("path");

const app = express();

// List of allowed origins
const allowedOrigins = ['https://horizon-games.netlify.app', 'https://horizon-games-v1.netlify.app'];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins list or if it's undefined (for non-browser requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());  
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use("/", authRoutes);
app.use("/games", lendRoutes);  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB(); 

app.listen(port, () => { 
    console.log(`App is running on ${port}`);
});
