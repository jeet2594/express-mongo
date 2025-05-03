import express from "express";
import routes from "./routes/route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
const port = 3000;
dotenv.config();
connectDB(); // Connect to MongoDB
// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.use('/', routes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});