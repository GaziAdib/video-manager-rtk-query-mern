import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';
import Logo from '../../assets/lws.svg'

const BlogCard = ({ blog }) => {

    const { blogTitle, blogCategory, blogDescription, blogAuthor } = blog || {};

    return (
        <>

            <div class="bg-blue-300 w-52 h-72 m-8 static rounded-lg ">
                <div className="bg-white w-52 h-72 -m-2 hover:m-0 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in ">
                    <h2 className="m-3 text-xl font-bold">{blogTitle}</h2>
                    <h4 className="m-3 text-xl bg-red-600 text-red-200 rounded-lg text-center">{blogCategory}</h4>
                    <hr className="m-4 rounded-2xl border-t-2" />
                    <p className="m-4 text-sm"> {parse(blogDescription.slice(0, 120))}</p>
                    <p className='m-4 text-sm text-purple-400 text-bold'>Blog Author: {blogAuthor} <img src={Logo} height="50px" width="50px" /></p>
                    <Link className='m-4 text-sm text-bold rounded-lg px-1 mx-1 mt-2 mb-2 bg-black text-white'> Full Details</Link>
                </div>


            </div>


        </>
    )
}

export default BlogCard