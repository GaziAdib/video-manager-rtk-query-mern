import React from 'react'
import { useSelector } from 'react-redux';
import { useFetchBlogsQuery, useFetchPaginatedBlogsQuery, useSearchBlogByTitleQuery } from '../../features/blogs/blogsApi';
import Loading from '../ui/Loading';
import PaginationBlogBox from '../ui/PaginationBlogBox';
import PaginationBox from '../ui/PaginationBox';
import BlogCard from './BlogCard';

const BlogLists = () => {

    const { blogSearch } = useSelector((state) => state?.blogs);

    const { data: searchBlogResults, isError: blogSearchError, isLoading: blogSearchLoading } = useSearchBlogByTitleQuery(blogSearch) || {};

    const { data: blogs, isLoading, isError, error } = useFetchBlogsQuery() || {};


    const { pageNumber } = useSelector((state) => state?.blogs);

    const { data: paginatedBlogs } = useFetchPaginatedBlogsQuery(Number(pageNumber));



    let content;

    if (isLoading) content = <Loading />;

    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if (!isError && !isLoading && blogs?.length === 0) {
        content = <div className="col-span-12">No Blogs Found!</div>;
    }

    if (!isError && !isLoading && blogs?.length > 0) {

        content = blogSearch === '' ? (
            paginatedBlogs?.data?.map((blog) => {
                return <BlogCard blog={blog} key={blog?._id} />
            })
        ) : (
            searchBlogResults?.length > 0 && searchBlogResults?.map((blog) => {
                return <BlogCard blog={blog} key={blog?._id} />
            })
        )


    }


    return (
        <>
            <section className="pt-3">
                <section className="pt-3">
                    <h1 className='text-center mx-auto text-green-600 my-1 py-1 font-medium font-bold'>All Blogs</h1>
                    <hr />

                    <div class='flex flex-col mx-1 my-1 px-1 py-1 items-center justify-center min-h-screen'>
                        {content}
                    </div>

                </section>

                <PaginationBox currentPage={paginatedBlogs?.currentPage} numberOfPages={paginatedBlogs?.numberOfPages} />

            </section>


        </>
    )
}

export default BlogLists