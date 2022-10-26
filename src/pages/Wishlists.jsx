import React from 'react'
import { useSelector } from 'react-redux';
import Loading from '../components/ui/Loading';
import WishCard from '../components/wishlist/WishCard';
import { useFetchAllWishlistsQuery, useFetchWishlistsQuery } from '../features/wishlists/wishlistsApi'

const Wishlists = () => {

  const { user } = useSelector((state) => state.auth) || {};

  const mainUser = localStorage.getItem('auth');

  const localUser = JSON.parse(mainUser);

  const userId = localUser?.user?._id

  const { data: mywishlists, isError, isLoading, error } = useFetchAllWishlistsQuery() || {};


  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <div className="col-span-12">{error}</div>

  if (!isError && !isLoading && mywishlists?.length === 0) {
    content = <div className="col-span-12">No Videos Found!</div>;
  }

  if (!isError && !isLoading && mywishlists?.length > 0) {

    content = mywishlists?.filter((item) => item?.authorName?.includes(localUser?.user?.username)).map((wishlist) => {
      return <WishCard key={wishlist?._id} wishlist={wishlist} />
    })


  }


  return (
    <>

      <section className="pt-10">
        <h2 className='text-center text-bold px-1 py-1 mx-auto'>My Favourites Collection ❤️</h2>
        <hr />
        <section className="pt-10">
          <div
            className="grid grid-cols-12 gap-4 max-w-6xl mx-auto px-4 lg:px-0 min-h-[300px]"
          >

            {content}

          </div>
        </section>
      </section>

    </>
  )
}

export default Wishlists


{/* <section className="pt-12">
            <section className="pt-12">
                <div
                    className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]"
                >

                    {content}

                </div>
            </section>
        </section> */}