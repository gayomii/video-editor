import Button from '@mui/material/Button';

const CustomButton = ({ onClick, type, buttonName, startIcon }) => {
  return (
    <Button startIcon={startIcon} onClick={onClick} variant={type}>
      {buttonName}
    </Button>
  );
};

CustomButton.defaultProps = {
  type: 'outlined',
};

export default CustomButton;
