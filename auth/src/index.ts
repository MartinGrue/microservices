import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  console.log("starting up.........");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("auth listening on 3000");
  });
};
start();
