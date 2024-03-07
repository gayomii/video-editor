import githubIcon from '../assets/github_icon.png';

const Footer = () => {
  return (
    <footer className={'footer'}>
      <a href="https://github.com/gayomii" target="_blank">
        <img src={githubIcon} width="32px" />
      </a>
    </footer>
  );
};

export default Footer;
