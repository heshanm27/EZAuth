import axios, { AxiosError } from "axios";

interface ISignInput {
  email?: string;
  userName?: string;
  password: String;
  apiUrl: string;
}

interface ISignInError {
  error: boolean;
  errorMsg: ISignInput;
}

interface IResponse {
  token: string;
  error: ISignInError;
}

const baseError: ISignInError = {
  error: false,
  errorMsg: {
    apiUrl: "",
    password: "",
  },
};

const defaultResponse: IResponse = {
  error: baseError,
  token: "",
};

function validate(value: ISignInput): boolean {
  const tempObj: ISignInput = {
    apiUrl: "",
    password: "",
  };

  tempObj.email = value?.email! === "" ? "Please provide email" : undefined;
  tempObj.password = value.password === "" ? "Please provide password" : "";
  tempObj.userName = value?.userName! === "" ? "Please provide username" : undefined;
  tempObj.apiUrl = value.apiUrl === "" ? "Please provide api url" : "";

  if (Object.values(tempObj).every((x) => x === undefined || x === "")) {
    return true;
  } else {
    baseError.error = true;
    baseError.errorMsg = {
      ...tempObj,
    };
    return false;
  }
}

async function apiCall(input: ISignInput): Promise<string> {
  try {
    const response = await axios.post(input.apiUrl, { email: input.email, password: input.password });
    const { token } = response.data;
    return token;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    return "";
  }
}

async function handleSignIn(input: ISignInput): Promise<IResponse> {
  if (validate(input)) {
    const token = await apiCall(input);
    defaultResponse.token = token;
  }
  return defaultResponse;
}

export default handleSignIn;
