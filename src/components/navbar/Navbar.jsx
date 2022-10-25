import React from 'react';
import Search from './Search';
import logoImage from '../../assets/lws.svg';
import searchImage from '../../assets/search.svg';
import { Link } from 'react-router-dom';
import { clearSearch } from '../../features/videos/videoSlice';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';



const Navbar = () => {

    const dispatch = useDispatch();

    // clear search
    const handleClear = () => {
        dispatch(clearSearch())
    }

    // const logout
    const logoutHandler = () => {
        dispatch(userLoggedOut())
        localStorage.clear();
    }

    return (
        <nav className="bg-slate-100 shadow-md">
            <div
                className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3"
            >
                <Link to='/'>
                    <img
                        className="h-10"
                        src={logoImage}
                        alt="Gazi Adib"
                    />
                </Link>
                <Link to='/addVideo'>
                    <span>AddView</span>
                </Link>
                <Link to='/my-wishlist'>
                    <span>Wishlist</span>
                </Link>
                <div
                    className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200"
                >


                    <Search />



                    <img
                        className="inline h-4 cursor-pointer"
                        src={searchImage}
                        alt="Search"
                    />

                    <span className='ml-3 pl-2' onClick={handleClear}>Clear</span>
                </div>
                <div style={{ float: 'right' }}>
                    <button className='bg-red-600 text-white mx-1 my-1 px-1 py-1 rounded' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar