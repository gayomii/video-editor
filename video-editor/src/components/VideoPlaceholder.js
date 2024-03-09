import React from 'react';
import video_placeholder from '../assets/video_placeholder.png';

const VideoPlaceholder = ({ _onChange }) => {
  return (
    <section className={'upload-layout'}>
      <label>
        <img
          className={'video-upload-img'}
          src={video_placeholder}
          alt="비디오를 업로드해주세요"
        />
        <input
          className={'video-upload-input'}
          type="file"
          accept="video/*"
          onChange={e => {
            _onChange(e.target.files[0]);
          }}
        />
      </label>
    </section>
  );
};

export default VideoPlaceholder;
