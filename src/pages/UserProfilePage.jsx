import React from 'react'
import { Link, useParams } from 'react-router-dom'
import EditProfileForm from '../components/FormData/EditProfileForm';
import { useFetchUserProfileInfoQuery } from '../features/profiles/profileApi';
import { useFetchVideosQuery } from '../features/videos/videosApi';

const UserProfilePage = () => {

    const { userId } = useParams();

    const { data: userInfo, isLoading, isError, error } = useFetchUserProfileInfoQuery(userId);

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

    // step 1 get videos
    const { data: videos } = useFetchVideosQuery() || {};

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

                    <div className="mt-4 mb-6">
                        <div className="mb-3 text-xl font-bold">Username: {userInfo?.username}</div>
                        <div className="mb-3 text-xl font-bold">Email: {userInfo?.email}</div>
                        <div class="text-sm text-neutral-600">BIO: {userInfo?.bio}</div>
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

                    <section className="pt-5 rounded-lg shadow border-2 border-dashed">
                        <section className="pt-5">
                            <div
                                className="grid grid-cols-12 gap-6 max-w-6xl mx-auto px-5 lg:px-0 min-h-[300px] mb-4"
                            >



                                {/* // Each Card */}


                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="relative">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src="https://img.freepik.com/free-vector/flat-clapperboard-icon_1063-38.jpg"
                                                    className="w-8/12 h-auto"
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
                                        <div className="relative">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                                                    className="w-6/12 h-auto"
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
                                        <div className="relative">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
                                                    className="w-8/12 h-auto"
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
                                        <div className="relative">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src="https://banner2.cleanpng.com/20180604/qso/kisspng-blogger-computer-icons-clip-art-blog-icon-5b15dcce320043.7011711915281594382048.jpg"
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
                                                        title

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
                                        <div className="relative">
                                            <Link to={`/`}>

                                                <img
                                                    id='videoThumnail'
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcg448jP0AJJEyApL6yzGV4IpFKqHqtEq9z7oOU9FMHqWqzMIZe5k9nsqEXyXESW3PCes&usqp=CAU"
                                                    className="w-6/12 h-auto"
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
                                                        title

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