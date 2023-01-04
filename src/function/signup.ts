import axios, { AxiosError } from "axios";
import validator from "validator";

interface ISignUpInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IValidate {
  valid: boolean;
  errorMsg?: ISignUpInput;
}

interface IResponse {
  status: boolean;
  error?: any;
}

/**
 * @description - Validate the input data
 * @param value - {email: string, firstName: string, lastName: string, password: string}
 * @returns {valid: boolean, errorMsg?: {email: string, firstName: string, lastName: string, password: string}}}
 */
function validate(value: ISignUpInput): IValidate {
  const tempObj: ISignUpInput = {
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  tempObj.email = validator.isEmail(value?.email) ? "" : "Please provide email";
  tempObj.password = validator.isEmpty(value?.password) ? "Please provide password" : "";
  tempObj.firstName = validator.isEmpty(value?.firstName) ? "Please provide first name" : "";
  tempObj.lastName = validator.isEmpty(value?.lastName) ? "Please provide last name" : "";

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
 * @description - Handle the sign up process
 * @param userData - {email: string, firstName: string, lastName: string, password: string}
 * @param apiUrl string
 * @returns {status: boolean, error?: any}
 */
async function handleSignUp(userData: ISignUpInput, apiUrl: string): Promise<IResponse> {
  try {
    await axios.post(apiUrl, {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
    });
    return {
      status: false,
      error: {},
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      error: err.response?.data,
    };
  }
}

export { handleSignUp, validate };
