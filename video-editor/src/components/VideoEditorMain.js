import React, { useContext } from 'react';
import 'video-react/dist/video-react.css';
import { VideoFileContext, VideoFileDispatchContext } from '../App';

import LaunchIcon from '@mui/icons-material/Launch';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomButton from './CustomButton';
import VideoPlaceholder from './VideoPlaceholder';
import VideoPlayer from './VideoPlayer';
import MultiRangeSlider from './MultiRangeSlider';

const VideoEditorMain = () => {
  const videoFile = useContext(VideoFileContext);
  const { addFile, deleteFile } = useContext(VideoFileDispatchContext);

  return (
    <main>
      <div className="main-header-container">
        <h2>Video Edit</h2>
        {!videoFile ? (
          ''
        ) : (
          <CustomButton
            onClick={deleteFile}
            type={'contained'}
            buttonName="Delete"
            startIcon={<DeleteIcon />}
          />
        )}
      </div>
      {!videoFile ? (
        <VideoPlaceholder
          _onChange={file => {
            addFile(file);
          }}
        />
      ) : (
        // TODO: 컴포넌트 분리
        <>
          <VideoPlayer videoFile={videoFile} />
          <MultiRangeSlider
            min={0}
            max={100}
            onChange={() => console.log('onChange')}
          />
          <div className="button-container">
            <CustomButton
              _onClick={() => console.log('gif 변환하기')}
              buttonName="GIF 내보내기"
              startIcon={<LaunchIcon />}
            ></CustomButton>
            <CustomButton
              _onClick={() => console.log('음성 내보내기')}
              buttonName="음성 내보내기"
              startIcon={<VolumeUpIcon />}
            ></CustomButton>
          </div>
        </>
      )}
    </main>
  );
};

export default VideoEditorMain;
