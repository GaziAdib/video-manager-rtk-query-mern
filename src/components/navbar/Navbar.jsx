import React from 'react';
import Search from './Search';
import logoImage from '../../assets/lws.svg';
import { Link } from 'react-router-dom';
import { clearSearch } from '../../features/videos/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import { useFetchAllWishlistsQuery } from '../../features/wishlists/wishlistsApi';


const Navbar = () => {

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

    // expand hamburger

    const expand = (e) => {
        const menu = document.getElementById('menuId');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex-col');
        menu.classList.toggle('mx-auto')


    }

    return (

        <nav className="items-center shadow-lg flex justify-between px-4 py-4 mx-auto bg-slate-100 shadow-md">
            <div>
                <Link to='/'>
                    <img
                        className="h-10"
                        src={logoImage}
                        alt="Gazi Adib"
                    />
                </Link>
            </div>

            <div id='menuId' className="hidden items-center mx-5 my-1 text-black space-x-8 lg:flex">
                <div id='search' className='rounded mx-auto my-2 mx-1 border-slate-200 border-dashed border-2 border-sky-500'>
                    <Search />
                </div>
                {search !== '' && <span className='ml-2 text-medium pl-1 pr-1 bg-red-200 text-red-600 rounded' onClick={handleClear}>Clear</span>}
                <Link to={'/addVideo'}>AddVideo</Link>
                <Link to={'/addBlog'}>AddBlogs</Link>
                <Link to={`/user/profile/${user?._id}`}>Dashboard</Link>
                <Link to={'/my-wishlist'}>MyWishlist ({lengthWishlist})</Link>
                <div style={{ float: 'right' }}>
                    <button className='bg-red-600 text-white mx-1 my-1 px-1 py-1 rounded mx-auto lg:flex' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className="flex lg:hidden">
                <svg
                    onClick={expand}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>
        </nav >


    )
}

export default Navbar

// <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" >
// <div className="container flex flex-wrap justify-between items-center mx-auto">
//     <Link href="https://flowbite.com/" className="flex items-center">
//         <img src={user?.profileImage} className="mr-3 h-6 sm:h-9" alt="profile Image" />
//         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Video Project</span>
//     </Link>
//     <div className="flex md:order-2">
//         <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
//             <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
//             <span className="sr-only">Search</span>
//         </button>
//         <div className="hidden relative md:block">
//             <div className='block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
//                 <Search />
//             </div>
//         </div>
//         <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
//             <span className="sr-only">Open menu</span>
//             <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
//         </button>
//     </div>
//     <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
//         <div className="relative mt-3 md:hidden">
//             <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
//             </div>
//         </div>
//         <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

//             <Link to={'/'}>
//                 <span className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Videos</span>
//             </Link>
//             <Link to={'/addVideo'}>
//                 <span className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Add Video</span>
//             </Link>
//             <Link to={'/my-wishlist'}>
//                 <span className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Wishlists ({lengthWishlist})</span>
//             </Link>

//         </ul>
//     </div>
// </div>
// </nav >


