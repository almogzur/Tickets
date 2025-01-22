import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define the allowed size options
type ButtonSize = 'large' | 'medium';

// Define styles for different sizes using Record
const StyledButton = styled(Button)<{ size: ButtonSize }>(({ size }) => {
  const sizes: Record<ButtonSize, { width: string; height: string; fontSize: string }> = {
    large: {
      width: '8.5em',
      height: '2.9em',
      fontSize: '1rem',
    },
    medium: {
      width: '7em',
      height: '2.5em',
      fontSize: '0.875rem',
    },
  };

  const currentSize = sizes[size];

  return {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '0.2em solid #3654ff',
    borderRadius: '0px',
    textAlign: 'right',
    position: 'relative',
    transition: 'all 0.6s ease',
    width: currentSize.width,
    height: currentSize.height,
    fontSize: currentSize.fontSize,
    '&:hover': {
      backgroundColor: '#3654ff',
    },
  };
});

// Props for the custom button component
interface CustomButtonProps extends ButtonProps {
  size?: ButtonSize; // Optional size prop

  
}

// Custom button component
const SingInButton: React.FC<CustomButtonProps> = ({ size = 'large', children, ...props }) => {
  return (
    <StyledButton   size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default SingInButton;