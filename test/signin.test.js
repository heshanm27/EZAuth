const { handleSignIn } = require("../dist/cjs/index.js");

test("SignIn", () => {
  expect("Sign In first Test").toBe("Sign In first Test");
});

test("Sign in fileds valid", async () => {
  const { error, token } = await handleSignIn(
    {
      email: "test@gmail.com",
      password: "1234",
    },
    "http://localhost:3002/sign"
  );

  expect(error).toEqual({});
  expect(token).toBe("token3434343");
});

test("Sign in fileds invalid", async () => {
  const { error, token } = await handleSignIn(
    {
      email: "",
      password: "",
    },
    "http://localhost:3002/sign"
  );

  expect(error).toEqual({
    email: "Please provide email",
    password: "Please provide password",
  });
  expect(token).toBe("");
});

test("credentials are not valid", async () => {
  const { error, token } = await handleSignIn(
    {
      email: "test@gmail.com",
      password: "123",
    },
    "http://localhost:3002/sign"
  );

  expect(error).toEqual({
    error: "credentials are not valid",
  });

  expect(token).toBe("");
});
