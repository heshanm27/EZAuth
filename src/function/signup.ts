interface ISignUpInput {
  email?: string;
  userName?: string;
  password: String;
  apiUrl: string;
}

interface ISignInError {
  error: boolean;
  errorMsg: ISignUpInput;
}

const baseError: ISignInError = {
  error: false,
  errorMsg: {
    apiUrl: "",
    password: "",
  },
};

interface IResponse {
  status: boolean;
  error: ISignInError;
}

function validate(value: ISignUpInput): boolean {
  const tempObj: ISignUpInput = {
    apiUrl: "",
    password: "",
  };

  tempObj.email = value?.email === "" ? "Please provide email" : "";
  tempObj.password = value.password === "" ? "Please provide password" : "";
  tempObj.userName = value.userName === "" ? "Please provide username" : "";
  tempObj.apiUrl = value.apiUrl === "" ? "Please provide api url" : "";

  if (Object.values(tempObj).every((x) => x === "")) {
    return true;
  } else {
    baseError.error = true;
    baseError.errorMsg = {
      ...tempObj,
    };
    return false;
  }
}

function handleSignUp(input: ISignUpInput): IResponse {
  const defaultResponse: IResponse = {
    error: baseError,
    status: false,
  };

  if (validate(input)) {
    return defaultResponse;
  }

  return defaultResponse;
}

export { handleSignUp };
