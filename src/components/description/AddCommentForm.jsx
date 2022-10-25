import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddCommentMutation } from '../../features/comments/commentsApi';

const AddCommentForm = ({ id }) => {

    const { user } = useSelector((state) => state?.auth) || {};

    const [addComment] = useAddCommentMutation() || {};

    const [content, setContent] = useState('');

    const [isFocus, setIsFocus] = useState(false);

    const localUser = localStorage.getItem('auth');

    const localFinalUser = JSON.parse(localUser);


    const addCommentHandler = (e) => {
        e.preventDefault();

        addComment({
            id: id,
            data: {
                authorName: localFinalUser?.user?.username,
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
                <label htmlFor="content">Add comment</label>
                <div>
                    <input onBlur={() => content === '' && setIsFocus(false)} onFocus={() => setIsFocus(true)} type="text" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="enter comment..." />
                </div>

                {isFocus && <button className='bg-green-600 text-white rounded-lg mx-1 my-1 px-1' type="submit">Add Comment</button>}

            </form>
        </>
    )



}

export default AddCommentForm

