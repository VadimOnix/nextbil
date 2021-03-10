/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  country: string;
  gender: Gender;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
