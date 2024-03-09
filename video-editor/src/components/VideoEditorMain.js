import React, { useContext } from 'react';
import 'video-react/dist/video-react.css';
import { VideoFileContext, VideoFileDispatchContext } from '../App';

import DeleteIcon from '@mui/icons-material/Delete';

import CustomButton from './CustomButton';
import VideoPlaceholder from './VideoPlaceholder';
import VideoPlayer from './VideoPlayer';
import MultiRangeSlider from './MultiRangeSlider';

import VideoConversionButton from './VideoConversionButton';
const VideoEditorMain = () => {
  const videoFile = useContext(VideoFileContext);
  const { addFile, deleteFile } = useContext(VideoFileDispatchContext);

  const [videoPlayer, setVideoPlayer] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
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
        <>
          <VideoPlayer videoFile={videoFile} />
          <MultiRangeSlider
            onSliderChange={([min, max]) => setSliderValues([min, max])}
          />
          <VideoConversionButton />
        </>
      )}
    </main>
  );
};

export default VideoEditorMain;
