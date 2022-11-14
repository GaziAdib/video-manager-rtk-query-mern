import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';
import Logo from '../../assets/lws.svg';
import moment from 'moment';

const BlogCard = ({ blog }) => {

    const { _id, blogTitle, blogCategory, blogDescription, blogAuthor, createdAt } = blog || {};

    return (
        <>
            <div class="rounded-xl border shadow-lg p-4 shadow-md w-9/12 bg-white m-2">
                <div class="flex w-full items-center justify-between border-b pb-3">
                    <div class="flex items-center space-x-3">
                        <div class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                        <div class="text-lg font-bold text-slate-700">{blogAuthor}</div>
                    </div>
                    <div class="flex items-center space-x-8">
                        <button class="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{blogCategory}</button>
                        <div class="text-xs text-neutral-500">{moment(createdAt).fromNow()}</div>
                    </div>
                </div>

                <div class="mt-4 mb-6">
                    <div class="mb-3 text-xl font-bold">"{blogTitle}"</div>
                    <div class="text-sm text-neutral-600">{parse(blogDescription.slice(0, 500))}</div>
                </div>

                <div>
                    <div class="flex items-center justify-between text-slate-500">
                        <div class="flex space-x-4 md:space-x-8">
                            <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>125</span>
                            </div>
                            <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span>4</span>
                            </div>

                            <Link to={`/blog/${_id}`}>

                                <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span>View</span>
                                </div>
                            </Link>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BlogCard






// <div class="bg-blue-300 w-52 h-72 m-8 static rounded-lg">
// <div className="bg-white w-52 h-72 -m-2 hover:m-0 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in">
//     <img src="https://avatars.githubusercontent.com/u/41202696?v=4" height="50px" className='rounded-full mx-auto shadow-lg text-center' width="50px" alt="profile" />
//     <h3 className="m-2 px-1 py-1 text-xl font-bold">{blogTitle}</h3>
//     <hr />
//     <h6 className="m-2 text-medium bg-red-200 rounded-full text-center">{blogCategory}</h6>
//     <p className="m-2 text-sm"> {parse(blogDescription.slice(0, 120))}</p>
//     <p className="m-3 text-sm">{moment(createdAt).format('YYYY-MM-DD')}</p>

//     <div>
//         <p className='m-3 py-1 text-sm text-slate-400 text-bold'><img src={Logo} style={{ float: 'left' }} height="50px" width="50px" /> <b style={{ float: 'right' }}>{blogAuthor}</b> </p>
//     </div>

//     <br />

//     <Link className='m-4 text-sm text-bold rounded-lg px-1 mx-1 mt-2 mb-2 bg-black text-white'>Continue</Link>
// </div>


// </div>