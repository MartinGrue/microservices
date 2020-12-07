import mongoose, { Schema, Document, Model, model } from "mongoose";
import { Password } from "../utils/Password";
const userSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc: UserDocument, ret) {
        (ret.id = ret._id), delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

interface IUser {
  email: string;
  password: string;
}
interface UserDocument extends Document, IUser {}

const middlewareFunctions = {
  hashPassword: async function (this: UserDocument, next: any) {
    const user = this;
    if (user.isModified("password")) {
      const hashedPassword = await Password.toHash(user.password);
      user.password = hashedPassword;
    }
    next();
  },
};

userSchema.pre<UserDocument>("save", middlewareFunctions.hashPassword);

interface IUserModel extends Model<UserDocument> {
  build(user: IUser): UserDocument;
}

const User: IUserModel = model<UserDocument, IUserModel>("test", userSchema);
User.build = (userAttributes: IUser) => {
  return new User(userAttributes);
};
export { User };
