import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteBlogMutation, useFetchSingleBlogQuery } from '../features/blogs/blogsApi';

const BlogDetailPage = () => {

    const { blogId } = useParams();

    const navigate = useNavigate();

    const { data: singleBlog, isLoading, isError, error } = useFetchSingleBlogQuery(blogId) || {};

    const [deleteBlog, { isLoading: detailBlogLoading, isError: detailBlogIsError, error: blogDetailError }] = useDeleteBlogMutation(blogId) || {};

    const deletBlogHandler = (blogId) => {
        deleteBlog(blogId);
        navigate('/allblogs');

    }



    return (
        <>
            <div>BlogDetailPage {blogId}</div>

            <div>
                <p>{singleBlog?.blogTitle}</p>
                <hr />
                <p>{singleBlog?.blogDescription}</p>
                <p>{singleBlog?.blogCategory}</p>
                <button onClick={() => deletBlogHandler(singleBlog?._id)}>Delete</button>
            </div>
        </>

    )
}

export default BlogDetailPage