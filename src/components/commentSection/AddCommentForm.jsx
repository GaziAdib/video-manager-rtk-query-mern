import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddCommentMutation } from '../../features/comments/commentsApi';


const AddCommentForm = ({ id }) => {

    const { user } = useSelector((state) => state?.auth) || {};

    const [addComment] = useAddCommentMutation() || {};

    const [content, setContent] = useState('');

    const [isFocus, setIsFocus] = useState(false);


    const addCommentHandler = (e) => {
        e.preventDefault();

        addComment({
            id: id,
            data: {
                authorName: user?.username,
                video_id: id,
                content: content
            }
        })
        setContent('');
        setIsFocus(false)

    }

    return (
        <>
            <form onSubmit={addCommentHandler}>
                <div className="mb-4 w-full bg-blue-50 rounded-lg border border-blue-200 light:bg-white-700 light:border-blue-600">
                    <div className="py-2 px-2 bg-white rounded-t-lg light:bg-blue-800">
                        <label for="comment" className="sr-only">Write Your comment</label>
                        <textarea onBlur={() => content === '' && setIsFocus(false)} onFocus={() => setIsFocus(true)} value={content} onChange={(e) => setContent(e.target.value)} id="comment" rows="4" className="px-0 w-full text-sm text-black bg-white border-0 light:bg-blue-800 focus:ring-0 light:text-white light:placeholder-blue-400" placeholder="Write a comment..." required></textarea>
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

export default AddCommentForm




{/* <form onSubmit={addCommentHandler}>
                <label htmlFor="content">Add comment</label>
                <div>
                    <input onBlur={() => content === '' && setIsFocus(false)} onFocus={() => setIsFocus(true)} type="text" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="enter comment..." />
                </div>

                {isFocus && <button className='bg-green-600 text-white rounded-lg mx-1 my-1 px-1' type="submit">Add Comment</button>}

            </form> */}
