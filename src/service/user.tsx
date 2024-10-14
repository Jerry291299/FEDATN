import React from 'react'
import { axiosservice } from '../config/API'


export const getAllusers = async () => {
  try{
    const {data} = await axiosservice.get('users')
    return data    
  } catch (error) {
    console.log(error);
  }
}
