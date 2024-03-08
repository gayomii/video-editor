import React, { useRef } from 'react';
import video_placeholder from '../assets/video_placeholder.png';

const VideoPlaceholder = ({ _onChange }) => {
  const uploadFile = useRef();

  return (
    <section className={'upload-layout'}>
      <img
        className={'video-upload-img'}
        src={video_placeholder}
        alt="비디오를 업로드해주세요"
        onClick={() => uploadFile.current.click()}
      />
      <input
        className={'video-upload-input'}
        type="file"
        accept="video/*"
        ref={uploadFile}
        onChange={e => {
          _onChange(e.target.files[0]);
        }}
      />
    </section>
  );
};

export default VideoPlaceholder;
