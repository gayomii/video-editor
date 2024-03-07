import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

const Header = () => {
  return (
    <header className={'header'}>
      <div className={'logo'}>
        <VideoSettingsIcon fontSize="large" />
        <h2>Gayeon's Video Editor</h2>
      </div>
      <nav>
        <ul>
          <li>비디오 편집</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
