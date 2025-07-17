import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import mongoDB from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

mongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
});
