import React from 'react'
import { useDeleteCommentMutation, useFetchCommentsQuery } from '../../features/comments/commentsApi'

const CommentLists = ({ id }) => {

    const { data: comments, isLoading, isError, isSuccess } = useFetchCommentsQuery(id) || {};

    const [deleteComment] = useDeleteCommentMutation() || {}


    const authUser = localStorage.getItem('auth');

    const mainUser = JSON.parse(authUser);


    const deleteCommentHandler = (commentData) => {
        // delete api

        if (mainUser?.user?.username === commentData.authorName) {
            deleteComment(commentData._id);
        } else {
            alert('you are not authorize to delete this comment!');
        }



    }


    return (
        <div>
            <h2>Comments</h2>
            {
                comments?.length > 0 && comments?.map((comment) => {
                    return <p key={comment._id}>comment: {comment.content} by ({comment.authorName}) {comment.authorName === mainUser?.user?.username && <span className='bg-red-600 mx-1 px-1' onClick={() => deleteCommentHandler(comment)}>Delete</span>
                    } </p>
                })
            }
        </div>
    )
}

export default CommentLists