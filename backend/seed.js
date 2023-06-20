import userSeeder from "./db/userSeeder.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

(async () => {
  // Call Seeders There
  await userSeeder();
})().then(() => {
  // Close Database Connection When Done Seeding
  mongoose.connection.close();
});
