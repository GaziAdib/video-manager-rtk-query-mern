import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDeleteVideoMutation } from '../../features/videos/videosApi';
import LikeUnlike from './LikeUnlike';
import moment from 'moment';
import { useSelector } from 'react-redux';
import EditIcon from '../../assets/edit_icon.png';
import DeleteIcon from '../../assets/delete_icon.png';
import SocialShare from '../SocialShare/SocialShare';


const VideoDescription = ({ video }) => {

    const { _id, title, createdAt, description, viewsCount, likes, authorId } = video || {};

    const [deleteVideo, { isSuccess, isError, error }] = useDeleteVideoMutation() || {};

    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((state) => state?.auth);


    // function to delete video
    const deleteVideoHandler = (videoId) => {
        deleteVideo(videoId);
        navigate('/');
    }


    return (
        <div>
            <h1
                className="text-lg font-semibold tracking-tight text-slate-800"
            >
                {title}
            </h1>
            <div
                className="pb-4 flex items-center space-around border-b"
            >
                <h2
                    className="text-sm leading-[1.7142857] text-slate-600 w-20"
                >
                    {viewsCount} views
                </h2>

                <h2
                    className="text-sm  text-slate-600 w-20"
                >
                    {likes?.length > 0 ? likes?.length : '0'} likes
                </h2>

                <h2
                    className="text-sm text-slate-600 w-20"
                >
                    {moment(createdAt).format('YYYY-MM-DD')}
                </h2>


                <LikeUnlike />

                <SocialShare quote={title} shareVideoUrl={`https://react-interviwer.web.app/solutions`} />


            </div>

            <div
                className="mt-4 text-sm text-[#334155] dark:text-slate-400"
            >
                {description}
            </div>

            {user?._id === authorId ? (<button onClick={() => deleteVideoHandler(_id)} style={{ float: 'right' }} className="shadow mb-3 px-2  my-2 text-sm mt-1">
                <img src={DeleteIcon} height="25px" width="25px" />
            </button>) : ('')
            }


            {user?._id === authorId ? (<Link to={`/videos/${_id}/update`} style={{ float: 'right' }} className="shadow mb-3 px-2 mx-1 my-2 text-sm mt-1">
                <img src={EditIcon} height="25px" width="25px" />
            </Link>
            ) : ('')
            }


        </div>
    )
}

export default VideoDescription