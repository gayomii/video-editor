import React, { useContext, useEffect, useState } from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react';
import { VideoFileContext } from '../App';

const VideoPlayer = ({ onPlayerChange, onPlayerStateChange }) => {
  const videoFile = useContext(VideoFileContext);
  const [player, setPlayer] = useState();
  const [playerState, setPlayerState] = useState();
  const [source, setSource] = useState();

  useEffect(() => {
    setSource(URL.createObjectURL(videoFile));
  }, [videoFile]);

  useEffect(() => {
    if (playerState) onPlayerStateChange(playerState);
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player);

    if (player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player]);

  return (
    <div className={'video-player'}>
      <Player ref={player => setPlayer(player)} src={source} startTime={0}>
        <source src={source} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
      </Player>
      {/* TEST */}
      <div>
        <p>총 재생 시간: {playerState?.duration}</p>
        <p>현재 재생 시간: {playerState?.currentTime}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
