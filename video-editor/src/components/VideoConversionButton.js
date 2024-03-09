import LaunchIcon from '@mui/icons-material/Launch';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import CustomButton from './CustomButton';

const VideoConversionButton = () => {
  return (
    <div className="button-container">
      <CustomButton
        onClick={() => console.log('gif 변환하기')}
        buttonName="GIF 내보내기"
        startIcon={<LaunchIcon />}
      ></CustomButton>
      <CustomButton
        onClick={() => console.log('음성 내보내기')}
        buttonName="음성 내보내기"
        startIcon={<VolumeUpIcon />}
      ></CustomButton>
    </div>
  );
};

export default VideoConversionButton;
