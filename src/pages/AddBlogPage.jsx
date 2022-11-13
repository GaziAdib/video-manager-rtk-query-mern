import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Error from '../components/ui/Error';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useAddBlogMutation } from '../features/blogs/blogsApi';

const AddBlogPage = () => {

    const { user } = useSelector((state) => state?.auth);

    const [addBlog, { isLoading, isError, error }] = useAddBlogMutation() || {};

    const navigate = useNavigate();

    const [blogTitle, setBlogTitle] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogDescription, setBlogDescription] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();

        addBlog({
            blogAuthorId: user?._id,
            blogAuthor: user?.username,
            blogTitle,
            blogCategory,
            blogDescription
        })

        navigate('/allblogs')
    }


    return (
        <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

            <div className="text-3xl mb-6 text-center ">
                Add Blogs To Your Liking ❤️
            </div>

            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                    <div className="col-span-2 lg:col-span-2">
                        <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="border-solid border-slate-400 border-2 p-3 md:text-xl w-full rounded-lg" required placeholder="Blog Title" />
                    </div>

                    <div className="col-span-2 lg:col-span-2">
                        <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="border-solid border-green-400 border-2 p-3 md:text-xl w-full rounded-lg" required>
                            <option value="news">News</option>
                            <option value="science">Science</option>
                            <option value="technology">Technology</option>
                            <option value="framework">Framework</option>
                            <option value="webdevelopment">Web Development</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="designpattern">Design Pattern</option>
                            <option value="competitiveprogramming">Competitive Programming</option>
                        </select>
                    </div>


                    <div className="col-span-2">
                        <label htmlFor="description" className='mx-2 my-2 px-1 py-2 text-slate-400'>Blog Description</label>
                        <CKEditor
                            editor={ClassicEditor}

                            data={blogDescription}

                            onReady={(editor) => {

                                editor.editing.view.change((writer) => {

                                    writer.setStyle(

                                        "height",

                                        "250px",

                                        editor.editing.view.document.getRoot()

                                    );

                                });

                            }}

                            onChange={(e, editor) => {

                                const data = editor.getData()

                                setBlogDescription(data);

                            }}

                            onBlur={(e, editor) => {

                                console.log('Blur.', editor);

                            }}

                        />

                    </div>



                    <div className="col-span-2 text-right">
                        <button disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                            Add Blog
                        </button>
                    </div>

                </div>
            </form>
            <div className="flex items-center justify-between">
                {!isLoading && error && <Error message={error} />}
            </div>
        </div>

    )
}

export default AddBlogPage



