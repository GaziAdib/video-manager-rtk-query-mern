import React from 'react';

import ReactPlayer from 'react-player';

const FacebookVideoShowPage = () => {
    return (
        <>

            {/* https://www.facebook.com/100008158750938/videos/820628929378767 */}
            {/* https://fb.watch/gF5PWY_RmS/ */}
            {/* https://www.youtube.com/watch?v=spHk9bPCBWg */}

            <h1 className='text-center mx-auto text-blue-400 font-bold mt-5 pt-5'>Facebook Video Page</h1>

            <div className='mx-auto mt-5 pt-5 pb-2 mb-2' style={{ margin: 'auto' }}>

                <div style={{ margin: 'auto' }}>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=spHk9bPCBWg"
                        controls
                        height="400px"
                        width="500px"
                        loop
                        pip
                        playing={true}
                        style={{ margin: 'auto' }}

                    />

                    <h3 style={{ borderRadius: '30px', margin: 'auto' }}>Upload By Adib</h3>
                    <h3 style={{ borderRadius: '30px', margin: 'auto' }}>Category: Entertainment</h3>
                    <h3 style={{ borderRadius: '30px', margin: 'auto' }}>date: 2/12/2020</h3>

                </div>



            </div>



        </>
    )
}

export default FacebookVideoShowPage