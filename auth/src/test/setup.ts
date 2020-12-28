import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongoServer = new MongoMemoryServer({
  binary: {
    version: "4.4.1",
  },
});
beforeAll(async () => {
  process.env.JWT_KEY = "Token_KEY_GOES_HERE";
  const connectString = await mongoServer.getUri();
  await mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany({}));
});
afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});
