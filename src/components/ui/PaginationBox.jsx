import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changePageNumber } from '../../features/blogs/blogSlice';
import { changeCurrentPage } from '../../features/videos/videoSlice';

const PaginationBox = ({ currentPage, numberOfPages }) => {

    const dispatch = useDispatch();

    const location = useLocation();
    const path = location?.pathname;


    const changeCurrentPageNumberInc = (pageCurrent) => {
        if (Number(pageCurrent) < Number(numberOfPages)) {

            path === '/' && dispatch(changeCurrentPage(pageCurrent + 1));
            path === '/allblogs' && dispatch(changePageNumber(pageCurrent + 1));

        } else if (Number(pageCurrent) === Number(numberOfPages)) {
            alert('cannot increase more')
        }
    }

    const changeCurrentPageNumberDec = (pageCurrent) => {
        if (Number(pageCurrent) === 1) {
            alert('cannot go back its page 1');
        } else {
            path === '/' && dispatch(changeCurrentPage(pageCurrent - 1));
            path === '/allblogs' && dispatch(changePageNumber(pageCurrent - 1));
        }
    }


    return (
        <>

            <div className='mx-auto px-2 text-center items-center mt-8 mb-4 shadow rounded-lg bg-gray-200 w-2/12'>

                <button disabled={Number(currentPage) === 1} onClick={() => changeCurrentPageNumberDec(currentPage)} className='mx-2 cursor-pointer rounded-full text-center items-center shadow-lg bg-white text-black mx-2 my-2 px-2 py-1 disabled:bg-gray-200'>Prev</button>

                <button disabled={Number(numberOfPages) === Number(currentPage)} onClick={() => changeCurrentPageNumberInc(currentPage)} className='mx-2 cursor-pointer rounded-full text-center items-center shadow-lg text-black bg-white mx-2 my-2 px-2 py-1 disabled:bg-gray-200'>Next</button>

            </div>
        </>
    )
}

export default PaginationBox