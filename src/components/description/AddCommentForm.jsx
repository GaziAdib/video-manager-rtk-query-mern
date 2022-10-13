import React from 'react'
import { useState } from 'react';
import { useAddCommentMutation } from '../../features/comments/commentsApi';

const AddCommentForm = ({ id }) => {
   
    console.log(id);

    const [addComment] = useAddCommentMutation() || {};

    const [content, setContent] = useState('');

   
    
    const addCommentHandler = (e) => {
        e.preventDefault();
        console.log('comment added');
        addComment({
            id: id,
            data: {
                video_id: id,
                content: content,
                author: 'Adib'
            }
        })
        setContent('');
    }

  return (
    <>
        <form onSubmit={addCommentHandler}>
            <label htmlFor="content">Content</label>
            <div>
                <input type="text" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="enter comment..." />
            </div>
            <span>
                <button className='bg-green-600 text-white rounded-lg mx-1 my-1 px-1' type="submit">Add Comment</button>
            </span>
        </form>
    </>
  )
   
    
  
}

export default AddCommentForm

