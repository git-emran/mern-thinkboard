import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import mongoDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middlware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

mongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
});
