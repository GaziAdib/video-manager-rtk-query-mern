import React from 'react'
import { Link, useParams } from 'react-router-dom'
import EditProfileForm from '../components/FormData/EditProfileForm';
import { useFetchBlogsQuery } from '../features/blogs/blogsApi';
import { useFetchUserProfileInfoQuery } from '../features/profiles/profileApi';
import { useFetchVideosQuery } from '../features/videos/videosApi';
import { useFetchAllWishlistsQuery } from '../features/wishlists/wishlistsApi';

// all images

import allVideosIcon from '../assets/all_videos.png';
import allBlogsIcon from '../assets/all_blogs.png';
import facebookVideoIcon from '../assets/facebook_videos.png';
import youtubeVideosIcon from '../assets/youtube_videos.png';
import wishlistsIcon from '../assets/all_wishlists.png';

const UserProfilePage = () => {

    const { userId } = useParams();

    // get user info data for profile update
    const { data: userInfo, isLoading, isError, error } = useFetchUserProfileInfoQuery(userId);

    console.log('profile Info', userInfo)

    // profile 

    // _id, username, email, profileImage, bio, password,

    // dashboard For Current User

    let allVideos;
    let totalVideoLikes = 0;
    let totalVideosCount = 0;
    let totalVideosViews = 0;

    let allYoutubeVideos = 0;
    let youtubeVideosCount = 0;
    let youtubeVideoViews = 0;
    let youtubeVideoLikes = 0;

    let allFacebookVideos = 0;
    let facebookVideosCount = 0;
    let facebookVideoViews = 0;
    let facebookVideoLikes = 0;

    let allBlogs = 0;
    let blogsCount = 0;

    let myWishlists = 0;
    let wishlistCount = 0;


    // step 1 get videos
    const { data: videos } = useFetchVideosQuery() || {};
    const { data: blogs } = useFetchBlogsQuery() || {};
    const { data: wishlists } = useFetchAllWishlistsQuery() || {};

    if (videos?.length > 0) {
        allVideos = videos?.filter((item) => item?.authorId === userInfo?._id);
        totalVideosCount = allVideos?.length;
        totalVideosViews = allVideos?.reduce((acc, item) => acc + item?.viewsCount, 0);
        totalVideoLikes = allVideos?.reduce((acc, item) => acc + item?.likes?.length, 0);

        // youtube analytics
        allYoutubeVideos = allVideos?.filter((item) => item?.videoSourceType === 'youtube');
        youtubeVideosCount = allYoutubeVideos?.length;
        youtubeVideoViews = allYoutubeVideos?.reduce((acc, item) => acc + item?.viewsCount, 0);
        youtubeVideoLikes = allYoutubeVideos?.reduce((acc, item) => acc + item?.likes?.length, 0);

        // facebook analytics
        allFacebookVideos = allVideos?.filter((item) => item?.videoSourceType === 'facebook');
        facebookVideosCount = allFacebookVideos?.length;
        facebookVideoViews = allFacebookVideos?.reduce((acc, item) => acc + item?.viewsCount, 0);
        facebookVideoLikes = allFacebookVideos?.reduce((acc, item) => acc + item?.likes?.length, 0);

    }

    // blogs data
    if (blogs?.length > 0) {
        allBlogs = blogs?.filter((blog) => blog?.blogAuthorId === userId);
        blogsCount = allBlogs?.length;
    }

    // wishlists data
    if (wishlists?.length > 0) {
        myWishlists = wishlists?.filter((item) => item?.authorName === userInfo?.username);
        wishlistCount = myWishlists?.length;
    }



    // dashboard end


    return (
        <>
            {

                userInfo &&
                <div className="rounded border shadow items-center content-center p-5 mx-5 my-5 w-12/12 bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                            <div className="text-lg font-bold text-slate-700">Welcome to <span className='text-green-600 font-bold'>{userInfo?.username}'s</span>  Profile</div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{userInfo?.email}</button>
                            <div className="text-xs text-neutral-500">date and time</div>
                        </div>
                    </div>

                    <div className="items-center py-10 sm: py-20 justify-betweenr">


                        <div class="rounded overflow-hidden shadow-md bg-red">
                            <div class="absolute -mt-20 w-full flex justify-center">
                                <div class="h-32 w-32">
                                    <img src={userInfo?.profileImage} alt="Display Picture of Andres Berlin" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                </div>
                            </div>
                            <div class="mt-16 content-center items-center">
                                <h1 class="font-bold text-3xl text-center mb-1">{userInfo?.username}</h1>
                                <p class="text-gray-800 text-sm text-center">{userInfo?.email}</p>
                                <p class="text-center text-gray-600 text-base pt-3 font-normal">{userInfo?.bio}</p>
                                <div class="w-full flex justify-center pt-5 pb-5">
                                    <a href="javascript:void(0)" class="mx-5">
                                        <div aria-label="Github" role="img">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="mx-5">
                                        <div aria-label="Twitter" role="img">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="mx-5">
                                        <div aria-label="Instagram" role="img">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-slate-500">
                            <div className="flex space-x-4 md:space-x-8">

                                <Link className='flex cursor-pointer items-center transition hover:text-slate-600' to={`/`}>
                                    <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                                        <span>Home</span>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <section className="pt-5 rounded-lg mx-auto shadow border-2 border-dashed">
                        <section className="px-5 mx-auto my-2 py-2 items-center">
                            <div
                                className="grid grid-cols-12 gap-6 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px] mb-5"
                            >



                                {/* // Each Card */}


                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative mx-auto">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src={allVideosIcon}
                                                    className="w-12/12 h-auto"
                                                    alt={userInfo?.username}
                                                />

                                            </Link>

                                        </div>

                                        <div className="flex flex-row mt-2 gap-2">
                                            <Link to={`/`} className="shrink-0">
                                                <img
                                                    src={userInfo?.profileImage}
                                                    className="rounded-full h-6 w-6"
                                                    alt={userInfo?.username}
                                                />
                                            </Link>

                                            <div clas="flex flex-col">
                                                <Link to={`/`}>
                                                    <p
                                                        className="text-slate-900 text-xl font-semibold"
                                                    >
                                                        total Videos Count: {totalVideosCount}

                                                    </p>
                                                </Link>
                                                <Link
                                                    className="text-gray-400 text-xl mt-2 hover:text-gray-600"
                                                    to={'/'}

                                                >
                                                    total likes:  {totalVideoLikes}

                                                </Link>
                                                <p className="text-gray-400 text-xl mt-1">
                                                    total views: {totalVideosViews}
                                                </p>


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative mx-auto">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src={youtubeVideosIcon}
                                                    className="w-12/12 h-auto"
                                                    alt={userInfo?.username}

                                                />

                                            </Link>
                                        </div>

                                        <div className="flex flex-row mt-2 gap-2">
                                            <Link to={`/`} className="shrink-0">
                                                <img
                                                    src={userInfo?.profileImage}
                                                    className="rounded-full h-6 w-6"
                                                    alt={userInfo?.username}
                                                />
                                            </Link>

                                            <div clas="flex flex-col">
                                                <Link to={`/`}>
                                                    <p
                                                        className="text-slate-900 text-xl font-semibold"
                                                    >
                                                        yt videos: {youtubeVideosCount}

                                                    </p>
                                                </Link>
                                                <Link
                                                    className="text-gray-400 text-xl mt-2 hover:text-gray-600"
                                                    to={'/'}

                                                >
                                                    likes: {youtubeVideoLikes}

                                                </Link>
                                                <p className="text-gray-400 text-xl mt-1">
                                                    views {youtubeVideoViews}
                                                </p>


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative mx-auto">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src={facebookVideoIcon}
                                                    className="w-12/12 h-auto"
                                                    alt={userInfo?.username}
                                                />

                                            </Link>

                                        </div>

                                        <div className="flex flex-row mt-4 gap-3">
                                            <Link to={`/`} className="shrink-0">
                                                <img
                                                    src={userInfo?.profileImage}
                                                    className="rounded-full h-6 w-6"
                                                    alt={userInfo?.username}
                                                />
                                            </Link>

                                            <div clas="flex flex-col">
                                                <Link to={`/`}>
                                                    <p
                                                        className="text-slate-900 text-xl font-semibold"
                                                    >
                                                        videos: {facebookVideosCount}

                                                    </p>
                                                </Link>
                                                <Link
                                                    className="text-gray-400 text-xl mt-2 hover:text-gray-600"
                                                    to={'/'}
                                                // onClick={(e) => filterByAuthorHandler(author)}

                                                >
                                                    likes: {facebookVideoLikes}

                                                </Link>
                                                <p className="text-gray-400 text-xl mt-1">
                                                    views: {facebookVideoViews}
                                                </p>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative mx-auto">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src={allBlogsIcon}
                                                    className="w-full h-auto"
                                                    alt={userInfo?.username}
                                                />

                                            </Link>

                                        </div>

                                        <div className="flex flex-row mt-2 gap-2">
                                            <Link to={`/`} className="shrink-0">
                                                <img
                                                    src={userInfo?.profileImage}
                                                    className="rounded-full h-6 w-6"
                                                    alt={userInfo?.username}
                                                />
                                            </Link>

                                            <div clas="flex flex-col">
                                                <Link to={`/`}>
                                                    <p
                                                        className="text-slate-900 text-sm font-semibold"
                                                    >
                                                        Blogs: {blogsCount}

                                                    </p>
                                                </Link>
                                                <Link
                                                    className="text-gray-400 text-xs mt-2 hover:text-gray-600"
                                                    to={'/'}
                                                // onClick={(e) => filterByAuthorHandler(author)}

                                                >
                                                    {userInfo?.username}

                                                </Link>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    views, likes, comment
                                                </p>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative mx-auto">
                                            <Link to={`/my-wishlist`}>

                                                <img
                                                    id='videoThumnail'
                                                    src={wishlistsIcon}
                                                    className="w-12/12 h-auto"
                                                    alt={userInfo?.username}
                                                />

                                            </Link>

                                        </div>

                                        <div className="flex flex-row mt-2 gap-2">
                                            <Link to={`/my-wishlist`} className="shrink-0">
                                                <img
                                                    src={userInfo?.profileImage}
                                                    className="rounded-full h-6 w-6"
                                                    alt={userInfo?.username}
                                                />
                                            </Link>

                                            <div clas="flex flex-col">
                                                <Link to={`/my-wishlist`}>
                                                    <p
                                                        className="text-slate-900 text-xl font-semibold"
                                                    >
                                                        Wishlists Count: {wishlistCount}

                                                    </p>
                                                </Link>
                                                <Link
                                                    className="text-gray-400 text-xs mt-2 hover:text-gray-600"
                                                    to={'/my-wishlist'}
                                                // onClick={(e) => filterByAuthorHandler(author)}

                                                >
                                                    {userInfo?.username}

                                                </Link>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    views, likes, comment
                                                </p>


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* // end of cards */}

                            </div>
                        </section>
                    </section>

                </div>
            }



            <br />
            <hr />



            <div>

                <h2 className='text-center mx-4 my-3 py-3 px-2 text-blue-600 font-bold text-3xl'>Edit User Profile Form</h2>
                {userInfo &&

                    <EditProfileForm userProfile={userInfo} />

                }

            </div>
        </>
    )
}

export default UserProfilePage



{/* <div class="mb-16">
            <!-- Code block starts -->
            <dh-component>
                <div class="container flex justify-center mx-auto pt-16">
                    <div>
                        <p class="text-gray-500 text-lg text-center font-normal pb-3">BUILDING TEAM</p>
                        <h1 class="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">The Talented People Behind the Scenes of the Organization</h1>
                    </div>
                </div>
                <div class="w-full bg-gray-100 px-10 pt-10">
                    <div class="container mx-auto">
                        <div role="list" aria-label="Behind the scenes People " class="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                            <div role="listitem" class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="Display Picture of Andres Berlin" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Andres Berlin</h1>
                                        <p class="text-gray-800 text-sm text-center">Chief Executive Officer</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">The CEO's role in raising a company's corporate IQ is to establish an atmosphere that promotes knowledge sharing and collaboration.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listitem" class="xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/photo-1530577197743-7adf14294584.jfif" alt="Display Picture of Silene Tokyo" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Silene Tokyo</h1>
                                        <p class="text-gray-800 text-sm text-center">Product Design Head</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">The emphasis on innovation and technology in our companies has resulted in a few of them establishing global benchmarks in product design and development.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listitem" class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/photo-1566753323558-f4e0952af115.jfif" alt="Display Picture of Johnson Stone" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Johnson Stone</h1>
                                        <p class="text-gray-800 text-sm text-center">Manager Development</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">Our services encompass the assessment and repair of property damage caused by water, fire, smoke, or mold. We can also be a part of the restoration.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listitem" class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/boy-smiling_23-2148155640.jpg" alt="Display Picture of Dean Jones" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Dean Jones</h1>
                                        <p class="text-gray-800 text-sm text-center">Principal Software Engineer</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">An avid open-source developer who loves to be creative and inventive. I have 20 years of experience in the field.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listitem" class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/blond-man-happy-expression_1194-2873.jpg" alt="Display Picture of Rachel Adams" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Rachel Adams</h1>
                                        <p class="text-gray-800 text-sm text-center">Product Design Head</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">Product designer with interests in immersive computing and XR, political ventures, and emerging technologies. Able to take ideas and give them a life.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listitem" class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div class="rounded overflow-hidden shadow-md bg-white">
                                    <div class="absolute -mt-20 w-full flex justify-center">
                                        <div class="h-32 w-32">
                                            <img src="https://cdn.tuk.dev/assets/photo-1570211776045-af3a51026f4a.jfif" alt="Display Picture of Charles Keith" role="img" class="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div class="px-6 mt-16">
                                        <h1 class="font-bold text-3xl text-center mb-1">Charles Keith</h1>
                                        <p class="text-gray-800 text-sm text-center">UX Designer</p>
                                        <p class="text-center text-gray-600 text-base pt-3 font-normal">A UX designer is the voice of the customer. Our job is to look beyond the business goals. We don't just experience user interface but also questions it.</p>
                                        <div class="w-full flex justify-center pt-5 pb-5">
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Github" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Twitter" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="mx-5">
                                                <div aria-label="Instagram" role="img">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}