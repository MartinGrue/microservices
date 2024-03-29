import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
const mongoServer = new MongoMemoryServer({
  binary: {
    version: "4.4.1",
  },
});
jest.mock("../NatsWrapper.ts");
jest.setTimeout(180000); //this works i dont know why
process.env.STRIPE_KEY =
  "sk_test_51I2f5fL6xj75mK0G7CRFFRspeeWEIYAPFcDkfYCRHVi59SFR5H00xlFdQwLMfWmQMWdigyIwTf64SNnW45ODXzHK00hxgOzq6L";

beforeAll(async () => {
  process.env.JWT_KEY = "Token_KEY_GOES_HERE";
  const connectString = await mongoServer.getUri();
  await mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany({}));
});
afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});
afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
  await mongoose.disconnect();
});
