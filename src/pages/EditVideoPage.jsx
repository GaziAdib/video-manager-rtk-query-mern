import React, { useState } from 'react';
import { useFetchSingleVideoQuery } from '../features/videos/videosApi';
import { useNavigate, useParams } from 'react-router-dom'
import EditForm from '../components/FormData/EditForm';

const EditVideoPage = () => {

  const { videoId } = useParams();

  const { data: singleVideoData, isLoading, isError, error } = useFetchSingleVideoQuery(videoId);

  return (
    <div className="w-full max-w-xs mx-auto pt-2 pb-2 my-2">
      <EditForm singleVideoData={singleVideoData} />
    </div>
  )
}

export default EditVideoPage

