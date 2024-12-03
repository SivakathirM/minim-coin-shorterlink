import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className=' w-full h-[70vh] text-center mt-16 md:mt-36 '>
        <div className='text-red-600 text-[40px] md:text-[80px]'>Error 404</div>
        <Link to={"/login"} className='underline text-sm md:text-lg'>Login Page</Link>
    </div>
    
  )
}

export default Error