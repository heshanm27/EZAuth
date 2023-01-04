import axios, { AxiosError } from "axios";
import validator from "validator";
interface ISignInput {
  email: string;
  password: string;
}
interface IValidate {
  valid: boolean;
  errorMsg?: ISignInput;
}

interface IResponse {
  token: string;
  error: any;
}

function validate(value: ISignInput): IValidate {
  const tempObj: ISignInput = {
    email: "",
    password: "",
  };

  console.log(value?.email);
  tempObj.email = validator.isEmail(value?.email) ? "" : "Please provide email";
  tempObj.password = validator.isEmpty(value?.password) ? "Please provide password" : "";

  if (Object.values(tempObj).every((x) => x === "")) {
    return {
      valid: true,
    };
  } else {
    return {
      valid: false,
      errorMsg: { ...tempObj },
    };
  }
}

async function handleSignIn(input: ISignInput, apiUrl: string): Promise<IResponse> {
  const defaultResponse: IResponse = {
    error: {},
    token: "",
  };

  try {
    const response = await axios.post(apiUrl, { email: input.email, password: input.password });
    const { token } = response.data;
    defaultResponse.token = token;
  } catch (error) {
    const err = error as AxiosError;
    defaultResponse.error = err.response?.data;
  } finally {
    return defaultResponse;
  }
}

export { handleSignIn, validate };
