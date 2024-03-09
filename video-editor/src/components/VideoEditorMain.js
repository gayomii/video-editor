import React, { useContext, useState, useEffect } from 'react';
import 'video-react/dist/video-react.css';
import { VideoFileContext, VideoFileDispatchContext } from '../App';

import DeleteIcon from '@mui/icons-material/Delete';

import CustomButton from './CustomButton';
import VideoPlaceholder from './VideoPlaceholder';
import VideoPlayer from './VideoPlayer';
import MultiRangeSlider from './MultiRangeSlider';

import { sliderValueToVideoTime } from '../util/sliderValueToVideoTime';
import VideoConversionButton from './VideoConversionButton';

const VideoEditorMain = () => {
  const videoFile = useContext(VideoFileContext);
  const { addFile, deleteFile } = useContext(VideoFileDispatchContext);

  const [videoPlayer, setVideoPlayer] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);

  useEffect(() => {
    const min = sliderValues[0];

    if (!min && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) videoPlayer.seek(minTime);

      if (videoPlayerState.currentTime > maxTime) videoPlayer.seek(minTime);
    }
  }, [videoPlayerState]);

  return (
    <main>
      <div className="main-header-container">
        <h2>Video Edit</h2>
        {videoFile && (
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
          <VideoPlayer
            onPlayerChange={player => setVideoPlayer(player)}
            onPlayerStateChange={playerState =>
              setVideoPlayerState(playerState)
            }
          />
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
