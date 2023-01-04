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

/**
 *
 * @param  value - {email: string, password: string}
 * @returns { valid: boolean, errorMsg?: {email: string, password: string} }
 */
function validate(value: ISignInput): IValidate {
  const tempObj: ISignInput = {
    email: "",
    password: "",
  };
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

/**
 * @description - Handle the sign in process
 * @param input - {email: string, password: string}
 * @param apiUrl string
 * @returns { token : string, error?: any }
 ***/
async function handleSignIn(input: ISignInput, apiUrl: string): Promise<IResponse> {
  try {
    const { valid, errorMsg } = validate(input);
    if (valid) {
      const response = await axios.post(apiUrl, { email: input.email, password: input.password });
      const { token } = response.data;
      return {
        token,
        error: {},
      };
    } else {
      return {
        token: "",
        error: errorMsg,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    return {
      token: "",
      error: err.response?.data,
    };
  }
}

export { handleSignIn, validate };
