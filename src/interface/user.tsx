export interface IUser {
  status: "active" | "deactive"; 
  // id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  fullname: string;
  isActive: boolean; 
}
  export type IUserRegister = Pick<IUser,'name'|'email'|'password'>
  export type IUserLogin = Pick<IUser,'email'|'password'>
  export type IUserCart = Pick<IUser,'id'>
  export type IUserLite = Pick<IUser, 'role' >