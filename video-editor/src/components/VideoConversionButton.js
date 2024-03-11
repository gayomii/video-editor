import { fetchFile } from '@ffmpeg/util';
import LaunchIcon from '@mui/icons-material/Launch';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { sliderValueToVideoTime } from '../util/sliderValueToVideoTime';
import { readFileAsBase64 } from '../util/readFileAsBase64';
import CustomButton from './CustomButton';

const VideoConversionButton = ({
  ffmpeg,
  sliderValues,
  videoFile,
  videoPlayerState,
}) => {
  const writeFile = async inputFileName => {
    return await ffmpeg.writeFile(
      inputFileName,
      await fetchFile(URL.createObjectURL(videoFile))
    );
  };

  const getMinMaxTime = () => {
    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    return [minTime, maxTime];
  };

  const downloadFile = dataURL => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.setAttribute('download', '');
    link.click();
  };

  const convertToGif = async () => {
    // TODO: 파일 변환 & 다운로드 진행 시 Loading 모달 창
    const inputFileName = 'input.mp4';
    const outputFileName = 'output.gif';

    await writeFile(inputFileName);
    const [minTime, maxTime] = getMinMaxTime();

    await ffmpeg.exec([
      '-i',
      `${inputFileName}`,
      '-ss',
      `${minTime}`,
      '-t',
      `${maxTime - minTime}`,
      '-f',
      'gif',
      `${outputFileName}`,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const gifURL = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' })
    );

    downloadFile(gifURL);
  };

  const onCutTheVideo = async () => {
    // TODO: 파일 변환 & 다운로드 진행 시 Loading 모달 창
    // BUG: 비디오 내보내기 시 처음 2초 정도 화면이 안보임
    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp4';

    await writeFile(inputFileName);
    const [minTime, maxTime] = getMinMaxTime();

    await ffmpeg.exec([
      '-i',
      `${inputFileName}`,
      '-ss',
      `${minTime}`,
      '-t',
      `${maxTime}`,
      '-c',
      'copy',
      `${outputFileName}`,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const dataURL = await readFileAsBase64(
      new Blob([data.buffer], { type: 'video/mp4' })
    );

    downloadFile(dataURL);
  };

  const onExportAudio = async () => {
    // TODO: 파일 변환 & 다운로드 진행 시 Loading 모달 창
    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp3';

    await writeFile(inputFileName);
    const [minTime, maxTime] = getMinMaxTime();

    await ffmpeg.exec([
      '-i',
      `${inputFileName}`,
      '-vn',
      '-ss',
      `${minTime}`,
      '-t',
      `${maxTime - minTime}`,
      `${outputFileName}`,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const dataURL = await readFileAsBase64(
      new Blob([data.buffer], { type: 'audio/mp3' })
    );

    downloadFile(dataURL);
  };

  return (
    <div className="button-container">
      <CustomButton
        onClick={convertToGif}
        buttonName="GIF 내보내기"
        startIcon={<LaunchIcon />}
      ></CustomButton>
      <CustomButton
        onClick={onCutTheVideo}
        buttonName="비디오 저장하기"
        startIcon={<SaveAltIcon />}
      ></CustomButton>
      <CustomButton
        onClick={onExportAudio}
        buttonName="음성 내보내기"
        startIcon={<VolumeUpIcon />}
      ></CustomButton>
    </div>
  );
};

export default VideoConversionButton;
