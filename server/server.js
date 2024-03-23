import express from "express";
import cors from "cors";
import items from "./routes/item.js";
import itemCategories from "./routes/itemCategory.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const PORT = process.env.PORT || 5000;
export const ATLAS_URI = process.env.ATLAS_URI;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/item", items);
app.use("/itemCategory", itemCategories);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`items`, items);
});
