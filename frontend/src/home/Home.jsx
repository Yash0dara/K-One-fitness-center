import React, { useState } from 'react'

import BestProducts from './BestProducts';
import HomeBanner from '../components/HomeBanner';
import ProductHome from '../components/ProductHome';
import WorkoutHome from '../components/WorkoutHome';
import BookingHome from '../components/BookingHome';
import ReviewHome from '../components/ReviewHome';
import Navbar from '../components/Navbar';

const Home = () => {

  const [show,setShow]=useState(true);
  const [cart,setCart]=useState([]);
  const handleClick = (product) => {
    // console.log(product);
    let isPresent =false;

    cart.forEach((item)=>{
      if(product._id === item._id)
        isPresent=true;
    })
    if(isPresent)
        return;
      setCart ([...cart, product]);
    }  
      return (
        <div>
        <Navbar size={cart.length}/>
        <HomeBanner/> 
        <WorkoutHome/>
        <BookingHome/>
        <ProductHome/>
        <ReviewHome/> 
        </div>
      )
}

export default Home