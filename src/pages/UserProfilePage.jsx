import React from 'react'
import { useParams } from 'react-router-dom'
import EditProfileForm from '../components/FormData/EditProfileForm';
import { useFetchUserProfileInfoQuery } from '../features/profiles/profileApi';

const UserProfilePage = () => {

    const { userId } = useParams();

    const { data: userInfo, isLoading, isError, error } = useFetchUserProfileInfoQuery(userId);


    return (
        <>
            {
                userInfo &&
                <div>
                    <h2>User Profile Of {userInfo?.username}</h2>
                </div>

            }

            <br />
            <hr />



            <div>

                <h1>Edit User Profile Form</h1>
                {userInfo &&

                    <EditProfileForm userProfile={userInfo} />

                }

            </div>
        </>
    )
}

export default UserProfilePage