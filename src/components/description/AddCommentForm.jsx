import React from 'react'
import { useState } from 'react';
import { useAddCommentMutation } from '../../features/comments/commentsApi';

const AddCommentForm = ({ id, authorId }) => {

    console.log(id);

    const authUser = localStorage.getItem('auth');

    const mainUser = JSON.parse(authUser);

    const [addComment] = useAddCommentMutation() || {};

    const [content, setContent] = useState('');

    const [isFocus, setIsFocus] = useState(false);


    const addCommentHandler = (e) => {
        e.preventDefault();
        console.log('comment added');
        addComment({
            id: id,
            data: {
                video_id: id,
                content: content,
                authorName: mainUser?.user?.username
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

