import React from 'react'
import { useFetchCommentsQuery } from '../../features/comments/commentsApi'
import Loading from '../ui/Loading';
import CommentCard from './CommentCard';


const CommentLists = ({ id }) => {

    const { data: comments, isLoading, isError, isSuccess } = useFetchCommentsQuery(id) || {};

    const totalComments = comments?.length;

    return (
        <div class="antialiased mx-auto max-w-screen-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments ({totalComments})</h3>
            <br />
            {
                isLoading ? <Loading /> : comments?.length > 0 ? (
                    comments?.map((comment) => {
                        return <CommentCard key={comment?._id} comment={comment} />
                    })
                ) : ('no comments for this video')
            }
        </div>
    )
}

export default CommentLists

