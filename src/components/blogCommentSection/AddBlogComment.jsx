import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddBlogCommentMutation } from '../../features/blogComments/blogCommentsApi';


const AddBlogComment = ({ blogId }) => {

    const { user } = useSelector((state) => state?.auth) || {};

    const [addBlogComment, { isLoading, isError, error }] = useAddBlogCommentMutation(blogId) || {};

    const [content, setContent] = useState('');

    const [isFocus, setIsFocus] = useState(false);


    const addCommentHandler = (e) => {
        e.preventDefault();

        addBlogComment({
            blogId: blogId,
            data: {
                blog_author_id: user?._id,
                blogAuthorName: user?.username,
                blog_id: blogId,
                blogCommentContent: content
            }
        })
        setContent('');
        setIsFocus(false)

    }

    return (
        <>
            <form onSubmit={addCommentHandler}>
                <div className="mb-4 w-full bg-blue-50 rounded-lg border border-blue-200 light:bg-white-700 light:border-blue-600">
                    <div className="py-1 px-2 bg-white rounded-t-lg light:bg-blue-800">
                        <label for="comment" className="sr-only">Write Your comment...</label>
                        <textarea
                            onBlur={() => content === '' && setIsFocus(false)}
                            onFocus={() => setIsFocus(true)} value={content}
                            onChange={(e) => setContent(e.target.value)} id="comment" rows="4"
                            className="px-0 w-full text-sm text-black bg-white border-0 light:bg-blue-800 light:placeholder-blue-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex justify-between items-center py-2 px-2 border-t light:border-blue-600">
                        {isFocus &&
                            <button type="submit" className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Post comment
                            </button>
                        }
                    </div>
                </div>
            </form>

        </>
    )



}

export default AddBlogComment




