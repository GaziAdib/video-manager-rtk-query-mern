import React from 'react'
import { useParams } from 'react-router-dom';
import EditBlogForm from '../components/FormData/EditBlogForm';
import { useFetchSingleBlogQuery } from '../features/blogs/blogsApi';

const EditBlogPage = () => {

    const { blogId } = useParams();

    const { data: singleBlog, isLoading, isError, error } = useFetchSingleBlogQuery(blogId) || {};

    return (
        <div className="w-full mx-auto pt-1 pb-1 px-1 my-2">
            {!isLoading && !isError && singleBlog &&
                <EditBlogForm singleBlog={singleBlog} />
            }
        </div>
    )
}

export default EditBlogPage