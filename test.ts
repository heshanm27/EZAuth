import { handleSignIn } from "./src/index";

const signTestObj = {
  email: "mhesahn27@gmail.com",
  password: "123",
  apiUrl: "http://localhost:3002/sign",
};

const signUpTestObj = {
  userName: "",
  password: "123",
  apiUrl: "http://localhost:3002",
};

async function callFun() {
  try {
    const { error, token } = await handleSignIn(signTestObj);
    console.log("Sign in token", token);
  } catch (error) {}
}

callFun();
// const { error: signUpError, status } = handleSignUp(signUpTestObj);

// console.log("sign In error", error);

// console.log("SignUp error", signUpError);
// console.log("SignUp status", status);
