import Snackbar from '@mui/joy/Snackbar';

const ToastBox = ({ open, onClose, text }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={onClose}
    >
      {text}
    </Snackbar>
  );
};

export default ToastBox;
