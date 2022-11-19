import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserProfileInfoMutation } from '../../features/profiles/profileApi';
import Error from '../ui/Error';

const EditProfileForm = ({ userProfile }) => {

    const { user } = useSelector((state) => state?.auth);

    const navigate = useNavigate();

    const [UpdateUserProfileInfo, { isLoading, isError, error }] = useUpdateUserProfileInfoMutation() || {};

    const {
        _id,
        username: initialUsername,
        profileImage: initialProfileImage,
        bio: initialBio
    } = userProfile || {};


    const [username, setUsername] = useState(initialUsername);
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [bio, setBio] = useState(initialBio);


    const submitHandler = (e) => {
        e.preventDefault();

        UpdateUserProfileInfo({
            userId: _id,
            data: {
                username,
                profileImage,
                bio
            }
        })

        navigate('/allblogs');


    }

    return (
        <>
            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Update Your Profile ❤️
                </div>

                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-solid border-slate-400 border-2 p-3 md:text-xl w-full rounded-lg" required placeholder="Update username" />
                        </div>


                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} className="border-solid border-slate-400 border-2 p-3 md:text-xl w-full rounded-lg" required placeholder="update profile Image" />
                        </div>


                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="border-solid border-slate-400 border-2 p-3 md:text-xl w-full rounded-lg" required placeholder="update Bio" />
                        </div>


                        <div className="col-span-2 text-right">
                            <button disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Update Profile
                            </button>
                        </div>

                    </div>
                </form>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>
            </div></>
    )
}

export default EditProfileForm