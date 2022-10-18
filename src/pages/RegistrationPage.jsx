import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterMutation } from '../features/auth/authAPI';
import LogoImage from '../assets/lws.svg'
import Error from '../components/ui/Error';


const RegistrationPage = () => {

    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [register, { data, isLoading, error: responseError }] = useRegisterMutation();

    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth) || {};
    const { email: authUserEmail } = user || {};


    useEffect(() => {

        if (responseError?.data) {
            setError(responseError.data);
        }

        if (data?.accessToken && data?.user) {
            navigate('/login');
        }

    }, [data, responseError, navigate]);




    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        if (confirmPassword !== password) {
            setError('Passwords do not match');
        } else {
            if (authUserEmail === email) {
                setError('This User Email Already Exist');
            } else {
                register({
                    profileImage,
                    username,
                    email,
                    password
                });
            }
        }
    }


    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={LogoImage}
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="avatar" className="sr-only">
                                    Avatar URL
                                </label>
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="text"
                                    autoComplete="avatar"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Avatar URL"
                                    value={profileImage}
                                    onChange={(e) => setProfileImage(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="Name"
                                    autoComplete="Name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                    checked={agreed}
                                    required
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <label
                                    htmlFor="accept-terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div> */}

                        <div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                Sign up
                            </button>
                        </div>

                        {error !== '' && <Error message={error} />}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage