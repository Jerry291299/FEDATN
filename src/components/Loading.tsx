import React from 'react'
import {
    LoadingOutlined
  } from '@ant-design/icons';

type Props = {}

const LoadingComponent = (props: Props) => {
  return (
    <>
    <div className='fixed top-0 right-0 left-0 bottom-0 z-100 bg-[#ffffff9e] flex align-center justify-center'>
    <LoadingOutlined />

    </div>
    </>
  )
}

export default LoadingComponent