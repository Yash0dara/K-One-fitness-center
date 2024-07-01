import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark, FaCartShopping, FaUser } from "react-icons/fa6";

const Navbar = ({ size, setShow }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, [])

    const navItems = [
        { link: "Home", path: "/" },
        { link: "Bookings", path: "/ScheduleView" },
        { link: "Workouts", path: "/MyWorkout" },
        { link: "Shop", path: "/shop" },
        { link: "Add Product", path: "/admin/dashboard" },
        { link: "Reviews", path: "/contactUs" },
        {link: "A_Reviews" , path: "/admin/dashboard/a_ContactUs"}
    ]


    const navigate = useNavigate()

    return (
        <header className={`w-full fixed top-0 transition-all duration-500 ${isSticky ? "bg-blue-300 z-50" : "bg-transparent"}`}>
            <nav className='py-4 lg:px-24' >
                <div className='flex justify-between items-center'>
                    <Link to="/home" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><img src="./img/logo.png" className="w-16 h-auto" alt="Logo" /></Link>

                    <ul className='hidden md:flex space-x-12'>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='text-base text-black uppercase cursor-pointer hover:text-blue-700' onClick={() => setShow(true)}>{link}</Link>
                            </li>
                        ))}
                    </ul>

                    <div onClick={() => setShow(false)} className='flex items-center space-x-2'>
                        <Link to="" className='text-2xl text-blue-500'><FaCartShopping /></Link>
                        <span>{size}</span>
                    </div>

                    <Link to="/profile" className='text-2xl text-blue-500'><FaUser /></Link>
                    <button className='btn bg-blue-700 text-white py-1 px-3 md:ml-8 rounded' onClick={()=>navigate("/login")}>Login </button>


                    <div className='flex items-center lg:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' /> }
                        </button>
                    </div>
                </div>

                <div className={`space-y-4 px-4 mt-12 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
