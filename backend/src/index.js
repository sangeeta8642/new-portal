import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { PORT } from "./constants.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running at", PORT);
    });
  })
  .catch((err) => {
    console.log("SERVER CONNECTION FAILER : ", err);
  });


  