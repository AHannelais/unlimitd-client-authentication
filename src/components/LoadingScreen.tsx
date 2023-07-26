import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  bottom: 0,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  position: 'fixed',
  right: 0,
  width: '100%',
  zIndex: 99999,
}));

const LoadingScreen = (props: TODO) => (
  <>
    <RootStyle {...props}>
      <CircularProgress size={24} />
    </RootStyle>
  </>
);

export default LoadingScreen;
