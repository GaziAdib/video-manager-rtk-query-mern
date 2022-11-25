import React from 'react'
import { useDispatch } from 'react-redux';
import { changePageNumber } from '../../features/blogs/blogSlice';

const PaginationBlogBox = ({ currentPage, numberOfPages }) => {


    const dispatch = useDispatch();


    // inc page count 
    const increamentPageNumber = (pageCurrent) => {
        if (Number(pageCurrent) < Number(numberOfPages)) {
            dispatch(changePageNumber(pageCurrent + 1));
        }
    }


    // dec page count 
    const decrementPageNumber = (pageCurrent) => {
        if (Number(pageCurrent) === 1) {
            alert('you are on page 1');
        } else {
            dispatch(changePageNumber(pageCurrent - 1));
        }
    }

    return (

        <>

            <div className='mx-auto px-2 text-center items-center mt-8 mb-4 shadow rounded-lg bg-gray-200 w-2/12'>

                <button disabled={Number(currentPage) === 1} onClick={() => decrementPageNumber(currentPage)} className='mx-2 cursor-pointer rounded-full text-center items-center shadow-lg bg-white text-black mx-2 my-2 px-2 py-1 disabled:bg-gray-200'>Prev</button>

                <button disabled={Number(currentPage) === Number(numberOfPages)} onClick={() => increamentPageNumber(currentPage)} className='mx-2 cursor-pointer rounded-full text-center items-center shadow-lg text-black bg-white mx-2 my-2 px-2 py-1 disabled:bg-gray-200'>Next</button>

            </div>
        </>

    )

}

export default PaginationBlogBox