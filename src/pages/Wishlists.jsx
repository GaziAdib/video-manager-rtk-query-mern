import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useDeleteWishlistMutation, useFetchWishlistsQuery } from '../features/wishlists/wishlistsApi'

const Wishlists = () => {

  const { user } = useSelector((state) => state.auth) || {};

  const mainUser = localStorage.getItem('auth');

  const localUser = JSON.parse(mainUser);

  //const userId = user?._id
  const userId = localUser?.user?._id

  const { data: mywishlists, isError, isLoading, error } = useFetchWishlistsQuery(userId);

  const [deleteWishlist] = useDeleteWishlistMutation() || {};


  // delete wishlist item

  const handleDelete = (id) => {
    deleteWishlist(id);
  }


  return (
    <div>
      <h1>Wishlists</h1>

      {mywishlists?.length > 0 && mywishlists?.filter((item) => item?.authorName?.includes(localUser?.user?.username)).map((item) => {
        return <div key={item._id} href="#" className="flex flex-row mx-1 my-1 px-1 py-1 items-center bg-white rounded-lg border shadow-md md:flex-row sm:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.thumbnailUrl} alt="" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <a href={`videos/${item.video_id}`}><h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5></a>
            <hr />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-600 dark:text-white">{item.category}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">author: {item.authorName}</p>
            <button className='bg-red-600 rounded-lg w-24 text-sm text-red-200 mx-1 my-2 px-2 py-2' onClick={() => handleDelete(item._id)}>Remove</button>
          </div>
        </div>
      })

      }

    </div>
  )
}

export default Wishlists