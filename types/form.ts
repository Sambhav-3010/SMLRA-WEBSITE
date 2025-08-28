import mongoose from 'mongoose';
export interface IFormSubmission {
  _id?: string | mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  rollNo: string;
  year: '1st' | '2nd' | '3rd' ;
  branch: string;
  phone: string;
  resume?: string;
  linkedin?: string;
  github?: string;
  about?: string;
  preference1?: string;
  preference2?: string;
  preference3?: string;
  whyYou?: string;
  questions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  error?: string;
  field?: string;
}
