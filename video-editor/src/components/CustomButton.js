import Button from '@mui/material/Button';

const CustomButton = ({ _onClick, type, buttonName, startIcon }) => {
  return (
    <Button startIcon={startIcon} onClick={_onClick} variant={type}>
      {buttonName}
    </Button>
  );
};

CustomButton.defaultProps = {
  type: 'outlined',
};

export default CustomButton;
