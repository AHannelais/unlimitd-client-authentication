import { Container, Typography } from '@mui/material';
import useAuth from '@/hooks/useAuth';

const UserGreetings = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Typography>Bonjour, vous êtes connecté en tant que {user.role} 🎉</Typography>
    </Container>
  );
};

export default UserGreetings;
