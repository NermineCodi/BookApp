import express, { urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authorRouter from "./routes/authors.js";
import bookRouter from "./routes/books.js";
import categoryRouter from "./routes/categories.js";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

//console.log("before connecting");
await connectDB();
//console.log("after connecting");

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  //enable logging
  app.use(morgan("dev"));
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // for parsing application/json
app.use('/public',express.static(path.join(__dirname ,"public"))); // Serve static assets from the 'public' folder, where 'uploads' is a subfolder
app.use(cors()); // Enable All CORS Requests

app.use("/api/authors", authorRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/books", bookRouter);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
