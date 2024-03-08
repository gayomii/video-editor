import React, { useEffect, useState } from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react';

const VideoPlayer = ({ videoFile }) => {
  const [player, setPlayer] = useState();
  const [source, setSource] = useState();

  useEffect(() => {
    setSource(URL.createObjectURL(videoFile));
  }, [videoFile]);

  // TODO: subscribe player
  // this.player.subscribeToStateChange(this.handleStateChange.bind(this))

  return (
    <div className={'video-player'}>
      <Player ref={player => setPlayer(player)} src={source} startTime={0}>
        <source src={source} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
      </Player>
    </div>
  );
};

export default VideoPlayer;
