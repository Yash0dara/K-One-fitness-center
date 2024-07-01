import React from 'react'
import Card from '../home/Card'
import {FiArrowRight} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'




const HomeBanner = () => {

  
  const navigate = useNavigate()

    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center '>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* left side */}
            <div className='md:w-1/2 space-y-8 h-full'>
              <h2 className='text-5xl font-bold leading-snug text-black'>Welcome to the official site of<span className='text-blue-700'> K-One Fitness Center</span></h2>
              <p className='md:w-4/5'>We're your one-stop destination for all things fitness. From booking sessions 
              to purchasing products and accessing tailored workouts, we've got you covered. 
              Join us and experience the convenience of having everything you need for your fitness journey in one place!</p>
            
          <button className='border-solid border-red-700 border-4 text-amber-900 px-10 py-5 text-xl uppercase tacking-widest hover:bg-amber-500 hover:text-white rounded-full' onClick={()=>navigate("/BMI")}>BMI calculator<FiArrowRight/></button>
             
            </div>
            {/* right side */}
            <div>
                <Card/>
            </div>
    
        </div> 
      </div>
      )
}

export default HomeBanner