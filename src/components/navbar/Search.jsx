import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
//   const { search } = useSelector(state => state.filter);
//   const [input, setInput] = useState(search);
  const [input, setInput] = useState("");

  const match = useMatch("/");
  const navigate = useNavigate();


  // form on submit

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(searched(input));

  // if use not in  home page redirect to home page

    if(!match) {
        navigate("/");
    }
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
            className="outline-none border-none mr-2"
            type="search"
            name="search"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    </form>
  )
}

export default Search