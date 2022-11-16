import React from 'react'
import { useFetchBlogCommentsQuery } from '../../features/blogComments/blogCommentsApi';
import Loading from '../ui/Loading';
import BlogCommentCard from './BlogCommentCard';

const BlogCommentLists = ({ blogId }) => {

    const { data: blogComments, isLoading, isError, isSuccess } = useFetchBlogCommentsQuery(blogId) || {};

    const totalBlogComments = blogComments?.length;

    return (
        <div className="antialiased mx-auto max-w-screen-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments ({totalBlogComments})</h3>
            <br />
            {
                isLoading ? <Loading /> : blogComments?.length > 0 ? (
                    blogComments?.map((blogComment) => {
                        return <BlogCommentCard key={blogComment?._id} blogComment={blogComment} />
                    })
                ) : ('no comments for this video')
            }
        </div>
    )
}

export default BlogCommentLists