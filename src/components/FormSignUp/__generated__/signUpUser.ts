/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignupInput, Gender } from "./../../../apollo/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signUpUser
// ====================================================

export interface signUpUser_signup {
  __typename: "UserType";
  id: string;
  name: string;
  email: string;
  country: string;
  gender: Gender;
}

export interface signUpUser {
  signup: signUpUser_signup;
}

export interface signUpUserVariables {
  input: SignupInput;
}
