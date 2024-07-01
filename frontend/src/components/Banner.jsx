import React from 'react'
import Card from '../home/Card'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center '>
    <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-20'>
      {/* left side */}
        <div >
          <Card/>   
        </div>


        {/* right side */}
         <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>Buy from one place!<span className='text-blue-700'> For the best price</span></h2>
          <p className='md:w-4/5'>"Discover your fitness essentials here. From gear to apparel, we've got you covered. 
          Elevate your gym sessions with our curated collection."</p>
            
        </div>

    </div> 
  </div>
  )
}

export default Banner