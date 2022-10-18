import React from 'react'
import { useFetchCommentsQuery } from '../../features/comments/commentsApi'

const CommentLists = ({ id }) => {

    const { data: comments, isLoading, isError, isSuccess } = useFetchCommentsQuery(id) || {};

    return (
        <div>
            <h2>Comments</h2>
            {
                comments?.length > 0 && comments?.map((comment) => {
                    return <p key={comment._id}>comment: {comment.content} by ({comment.authorName})</p>
                })
            }
        </div>
    )
}

export default CommentLists