import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

const Header = () => {
  return (
    <header className={'header'}>
      <div className={'logo'}>
        <VideoSettingsIcon fontSize="large" sx={{ color: '#1c548c' }} />
      </div>
      <nav>
        <ul>
          <li>비디오 편집</li>
          <li className="disabled-menu">이미지 편집</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
