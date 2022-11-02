import React from 'react';
import { useFetchSingleVideoQuery } from '../features/videos/videosApi';
import { useParams } from 'react-router-dom'
import EditForm from '../components/FormData/EditForm';

const EditVideoPage = () => {

  const { videoId } = useParams();

  const { data: singleVideoData, isLoading, isError, error } = useFetchSingleVideoQuery(videoId);

  return (
    <div className="w-full mx-auto pt-1 pb-1 px-1 my-2">
      {!isLoading && !isError && singleVideoData &&
        <EditForm singleVideoData={singleVideoData} />
      }
    </div>
  )
}

export default EditVideoPage

