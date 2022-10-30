import React from 'react'
import { useDeleteCommentMutation } from '../../features/comments/commentsApi';


const CommentCard = ({ comment }) => {

    const { authorName, content, createdAt } = comment || {};

    const [deleteComment] = useDeleteCommentMutation() || {}

    const localUser = localStorage.getItem('auth');
    const mainUser = JSON.parse(localUser)

    const profileImage = mainUser?.user?.profileImage;


    const deleteCommentHandler = (commentData) => {

        if (mainUser?.user?.username === commentData?.authorName) {
            deleteComment(commentData._id);
        } else {
            alert('you are not authorize to delete this comment!');
        }
    }


    return (
        <div class="flex m-2">
            <div class="flex-shrink-0 mr-2">
                <img class="mt-2 rounded-full w-6 h-6 sm:w-10 sm:h-10" src={profileImage} alt="" />
            </div>
            <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{authorName}</strong> <span class="text-xs text-gray-400">{createdAt}</span>
                <p class="text-sm">
                    {content}
                </p>
                {mainUser?.user?.username === comment?.authorName && <button style={{ float: 'right' }} className='mx-1 px-1 rounded-lg bg-red-200 text-red-600' onClick={() => deleteCommentHandler(comment)}>Delete</button>}
            </div>

        </div>
    )
}
export default CommentCard