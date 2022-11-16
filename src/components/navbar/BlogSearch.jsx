import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { searchBlog } from '../../features/blogs/blogSlice';


const BlogSearch = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState('');

    const match = useMatch("/");
    const navigate = useNavigate();


    // form on submit
    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch(searchBlog(input));

        if (!match) {
            navigate("/allblogs");
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2 ml-2 p-1"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    )
}

export default BlogSearch