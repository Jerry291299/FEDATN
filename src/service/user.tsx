import React from 'react'
import { axiosservice } from '../config/API'
import { IUserLogin, IUserRegister } from '../interface/user'


export const getAllusers = async () => {
  try{
    const {data} = await axiosservice.get('users')
    return data    
  } catch (error) {
    console.log(error);
  }
}

export const UserLogin = async (datauser : IUserLogin) => {
  try {
      const {data} = await axiosservice.post('/login', datauser)
      return data
  } catch (error) {
      console.error('Login error:', error);
      throw error;
      
  }
}

export const UserRegister = async (datauser : IUserRegister) => {
  try {
      const {data} = await axiosservice.post('/register', datauser)
      return data
  } catch (error) {
      console.error('Register error:', error);
      throw error;
  }
}