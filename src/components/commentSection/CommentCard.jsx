import React from 'react'
import { useSelector } from 'react-redux';
import { useDeleteCommentMutation } from '../../features/comments/commentsApi';


const CommentCard = ({ comment }) => {

    const { authorName, content, createdAt } = comment || {};

    const [deleteComment] = useDeleteCommentMutation() || {}

    const { user } = useSelector((state) => state?.auth);
    const { profileImage } = user || {};


    const deleteCommentHandler = (commentData) => {

        if (user?.username === commentData?.authorName) {
            deleteComment(commentData._id);
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
                <strong>{authorName}</strong> <span className="text-xs text-gray-400">{createdAt}</span>
                <p className="text-sm">
                    {content}
                </p>
                {user?.username === comment?.authorName && <button style={{ float: 'right' }} className='mx-1 px-1 rounded-lg bg-red-200 text-red-600' onClick={() => deleteCommentHandler(comment)}>Delete</button>}
            </div>

        </div>
    )
}
export default CommentCard