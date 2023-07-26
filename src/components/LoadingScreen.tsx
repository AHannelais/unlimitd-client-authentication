import { TODO } from '@/types';
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

export default function LoadingScreen(props: TODO) {
  return (
    <RootStyle {...props}>
      <CircularProgress size={24} />
    </RootStyle>
  );
}
