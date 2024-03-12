import React, { useContext, useState, useEffect } from 'react';
import 'video-react/dist/video-react.css';
import { VideoFileContext, VideoFileDispatchContext } from '../App';
import { FFmpeg } from '@ffmpeg/ffmpeg';

import DeleteIcon from '@mui/icons-material/Delete';
import ContentCutIcon from '@mui/icons-material/ContentCut';

import CustomButton from './CustomButton';
import VideoPlaceholder from './VideoPlaceholder';
import VideoPlayer from './VideoPlayer';
import MultiRangeSlider from './MultiRangeSlider';
import LoadingModal from './LoadingModal';

import { sliderValueToVideoTime } from '../util/sliderValueToVideoTime';
import VideoConversionButton from './VideoConversionButton';
import ToastBox from './ToastBox';

const ffmpeg = new FFmpeg();

const VideoEditorMain = () => {
  const videoFile = useContext(VideoFileContext);
  const { addFile, deleteFile } = useContext(VideoFileDispatchContext);

  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function loadFFmpeg() {
      await ffmpeg.load();
    }

    loadFFmpeg();
    setFfmpegLoaded(true);
  }, []);

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
    <>
      <main>
        <div className="main-header-container">
          <h2>비디오 편집</h2>
          {videoFile && (
            <CustomButton
              onClick={deleteFile}
              type={'contained'}
              buttonName="비디오 삭제"
              startIcon={<DeleteIcon />}
            />
          )}
        </div>
        {!videoFile ? (
          <VideoPlaceholder
            onChange={file => {
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
            <div className="video-editing-container">
              <p className="video-total-duration">
                비디오 재생시간:{' '}
                {videoPlayerState && Math.ceil(videoPlayerState.duration)}초
              </p>
              <div className="video-duration">
                <p>
                  시작:
                  {videoPlayerState &&
                    sliderValueToVideoTime(
                      videoPlayerState.duration,
                      sliderValues[0]
                    )}
                  초
                </p>
                <p>
                  끝:
                  {videoPlayerState &&
                    sliderValueToVideoTime(
                      videoPlayerState.duration,
                      sliderValues[1]
                    )}
                  초
                </p>
              </div>
              <div className="video-cutting-slider">
                <ContentCutIcon />
                <MultiRangeSlider
                  onSliderChange={([min, max]) => setSliderValues([min, max])}
                />
              </div>
            </div>
            {ffmpegLoaded && (
              <VideoConversionButton
                ffmpeg={ffmpeg}
                sliderValues={sliderValues}
                videoPlayerState={videoPlayerState}
                videoFile={videoFile}
                onConversionStart={() => setProcessing(true)}
                onConversionEnd={() => {
                  setProcessing(false);
                  setShowToast(true);
                }}
              />
            )}
          </>
        )}
      </main>
      <LoadingModal show={processing} onHide={() => setProcessing(false)} />
      <ToastBox
        open={showToast}
        onClose={() => setShowToast(false)}
        text="내보내기가 완료되었습니다."
      ></ToastBox>
    </>
  );
};

export default VideoEditorMain;
