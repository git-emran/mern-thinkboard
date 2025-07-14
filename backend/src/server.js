import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import mongoDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoDB();

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server Running on PORT:", PORT);
});
