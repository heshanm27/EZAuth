const { handleSignUp } = require("../dist/cjs/index.js");

test("SignUp", () => {
  expect("Sign Up first Test").toBe("Sign Up first Test");
});

test("Sign in fileds valid", async () => {
  const { error, status } = await handleSignUp(
    {
      email: "test@gmail.com",
      password: "1234",
      firstName: "test",
      lastName: "test",
    },
    "http://localhost:3002/signup"
  );

  expect(error).toEqual({});
  expect(status).toEqual(true);
});

test("Sign in fileds invalid", async () => {
  const { error, status } = await handleSignUp(
    {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    "http://localhost:3002/signup"
  );

  expect(error).toEqual({
    email: "Please provide email",
    password: "Please provide password",
    firstName: "Please provide first name",
    lastName: "Please provide last name",
  });
  expect(status).toEqual(false);
});

test("invalid api route", async () => {
  const { error, status } = await handleSignUp(
    {
      email: "test@gmail.com",
      password: "123",
      firstName: "test",
      lastName: "test",
    },
    "http://localhost:3002/signup/22"
  );

  expect(error).toEqual({
    error: "This route doesn't exist",
  });

  expect(status).toEqual(false);
});
