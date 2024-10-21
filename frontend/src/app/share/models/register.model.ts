export interface regResponse {
  success: boolean;
  data: Data;
  message: string;
  LOGIN_TYPE: string;
  token: string;
  status: number;
}

export interface Data {
  phoneVerified: boolean;
  dob: any;
  age: any;
  areaOfInterest: any;
  branch: any;
  gender: string;
  institution: any;
  semester: any;
  stream: any;
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  description: any;
  verified: boolean;
  question_step: boolean;
  location: any;
  skills: any[];
  status: boolean;
  createdAt: string;
  __v: number;
  emailVerified: boolean;
}
