import { User } from "../User";
const validEmail = "test@test.com";
const validPassword = "1234";

it("creates an hashed password via mongoose middle on user save", async () => {
  const user = User.build({ email: validEmail, password: validPassword });

  await user.save();
  user.email = "stringy";
  await user.save();
  //   expect(user.password).not.toBe(validPassword);
  expect(user.isModified("password")).toBe(false);
  console.log(validPassword);
  console.log(user.password);
});
