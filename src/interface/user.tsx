export interface IUser{
    id:string;
    name:string;
    email:string;
    role: string;
    password:string;
    fullname:string;
  }
  export type IUserRegister = Pick<IUser,'name'|'email'|'password'>
  export type IUserLogin = Pick<IUser,'email'|'password'>
  export type IUserCart = Pick<IUser,'id'>