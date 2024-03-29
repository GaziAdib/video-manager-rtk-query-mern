import React from 'react';
import Search from './Search';
import logoImage from '../../assets/lws.svg';
import searchImage from '../../assets/search.svg';
import { Link } from 'react-router-dom';
import { clearSearch } from '../../features/videos/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import { useFetchAllWishlistsQuery } from '../../features/wishlists/wishlistsApi';

const backnav = () => {

    const { search } = useSelector((state) => state?.videos);
    const { user } = useSelector((state) => state?.auth);


    const dispatch = useDispatch();


    const { data: mywishlists, isError, isLoading, error } = useFetchAllWishlistsQuery() || {};

    const lengthWishlist = mywishlists?.filter((item) => item?.authorName === user?.username).length;



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

                {user !== '' && <Link to='/addVideo'>
                    <span className='sm:hidden'>AddView</span>
                </Link>}



                {user !== '' && <Link to='/my-wishlist'>
                    <span>Wishlist ({lengthWishlist})</span>
                </Link>}

                <div
                    className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200"
                >


                    <Search />



                    <img
                        className="inline h-4 cursor-pointer"
                        src={searchImage}
                        alt="Search"
                    />

                    {search !== '' && <span className='ml-3 text-sm pl-1 pr-1 bg-red-200 text-red-600 rounded' onClick={handleClear}>Clear</span>}
                </div>
                <div style={{ float: 'right' }}>
                    <button className='bg-red-600 text-white mx-1 my-1 px-1 py-1 rounded' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </nav>

    )
}

export default backnav

