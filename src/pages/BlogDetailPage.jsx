import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDeleteBlogMutation, useFetchSingleBlogQuery } from '../features/blogs/blogsApi';
import moment from 'moment';
import Parser from 'html-react-parser';
import SocialShare from '../components/SocialShare/SocialShare';
import BlogCommentLists from '../components/blogCommentSection/BlogCommentLists';
import AddBlogComment from '../components/blogCommentSection/AddBlogComment';


const BlogDetailPage = () => {

    const { blogId } = useParams();

    const location = useLocation();
    const path = location.pathname;
    const finalUrlpath = `http://localhost:3000${path}`;


    const navigate = useNavigate();

    const { data: singleBlog, isLoading, isError, error } = useFetchSingleBlogQuery(blogId) || {};

    const { _id, blogTitle, blogDescription, blogCategory, blogAuthor, createdAt } = singleBlog || {};


    const [deleteBlog, { isLoading: detailBlogLoading, isError: detailBlogIsError, error: blogDetailError }] = useDeleteBlogMutation(blogId) || {};

    const deletBlogHandler = (blogId) => {
        deleteBlog(blogId);
        navigate('/allblogs');

    }



    return (

        <>
            {!isLoading && !isError && singleBlog &&
                <div className="rounded border shadow items-center content-center p-5 mx-5 my-5 w-12/12 bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                            <div className="text-lg font-bold text-slate-700">{blogAuthor}</div>
                        </div>
                        <div className="flex items-center space-x-8">
                            <SocialShare shareVideoUrl={finalUrlpath} quote={blogTitle} />
                            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{blogCategory}</button>
                            <div className="text-xs text-neutral-500">{moment(createdAt).fromNow()}</div>
                        </div>
                    </div>

                    <div className="mt-4 mb-6">
                        <div className="mb-3 text-xl font-bold">"{blogTitle}"</div>
                        <div class="text-sm text-neutral-600">{Parser(blogDescription)}</div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-slate-500">
                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span>125</span>
                                </div>



                                <Link className='flex cursor-pointer items-center transition hover:text-slate-600' to={`/allblogs`}>
                                    <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                                        <span>Home</span>
                                    </div>
                                </Link>

                                <Link to={`/blog/${_id}/update`} className="px-2 py-2 my-auto bg-blue-200 text-center text-blue-600 rounded-lg">Edit</Link>

                                <button className="mx-auto mt-2 mb-2 px-2 py-2 bg-red-600 text-white rounded-lg" onClick={() => deletBlogHandler(_id)}>Delete</button>

                            </div>
                        </div>
                    </div>

                </div>}


            <div>
                Add Comment Section

                <br />

                <AddBlogComment blogId={blogId} />

            </div>

            <br />
            <div>
                COMMENT SECTION LIST

                <br />

                <BlogCommentLists blogId={blogId} />



            </div>

        </>

    )
}

export default BlogDetailPage

