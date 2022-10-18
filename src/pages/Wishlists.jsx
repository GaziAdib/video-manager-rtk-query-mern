import React from 'react'
import { Link } from 'react-router-dom';
import { useDeleteWishlistMutation, useFetchWishlistsQuery } from '../features/wishlists/wishlistsApi'

const Wishlists = () => {

  const authUser = localStorage.getItem('auth');

  const mainUser = JSON.parse(authUser);

  const userId = mainUser?.user?._id

  const { data: mywishlists, isError, isLoading, error } = useFetchWishlistsQuery(userId);

  const [deleteWishlist] = useDeleteWishlistMutation() || {};


  // delete wishlist item

  const handleDelete = (id) => {
    console.log('delete')
    deleteWishlist(id);
  }


  return (
    <div>
      <h1>Wishlists</h1>

      {mywishlists?.length > 0 && mywishlists.map((item) => {
        return <a key={item._id} href="#" className="flex flex-row mx-1 my-1 px-1 py-1 items-center bg-white rounded-lg border shadow-md md:flex-row sm:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.thumbnailUrl} alt="" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
            <hr />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-600 dark:text-white">{item.category}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">author: {item.authorName}</p>
            <button className='bg-red-600 rounded-lg w-24 text-sm text-red-200 mx-1 my-2 px-2 py-2' onClick={() => handleDelete(item._id)}>Remove</button>
          </div>
        </a>
      })

      }

    </div>
  )
}

export default Wishlists