import React from 'react'
import { useSelector } from 'react-redux';
import { useDeleteBlogCommentMutation } from '../../features/blogComments/blogCommentsApi';
import moment from 'moment';

const BlogCommentCard = ({ blogComment }) => {

    const { _id, blogAuthorName, blogCommentContent, createdAt } = blogComment || {};

    const [deleteBlogComment] = useDeleteBlogCommentMutation(_id) || {};

    const { user } = useSelector((state) => state?.auth);
    const { profileImage } = user || {};


    const deleteCommentHandler = (blogCommentData) => {

        if (user?.username === blogCommentData?.blogAuthorName) {
            deleteBlogComment(blogCommentData._id);
            console.log('delete blog comment', blogCommentData._id)
        } else {
            alert('you are not authorize to delete this comment!');
        }
    }


    return (
        <div className="flex m-2">
            <div className="flex-shrink-0 mr-2">
                <img className="mt-2 rounded-full w-6 h-6 sm:w-10 sm:h-10" src={profileImage} alt="" />
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{blogAuthorName}</strong> <span className="text-xs text-gray-400">{moment(createdAt).format('YYYY-MM-DD')}</span>
                <p className="text-sm">
                    {blogCommentContent}
                </p>
                {user?.username === blogAuthorName && <button style={{ float: 'right' }} className='mx-1 px-1 rounded-lg bg-red-200 text-red-600' onClick={() => deleteCommentHandler(blogComment)}>Delete</button>}
            </div>

        </div>
    )
}

export default BlogCommentCard