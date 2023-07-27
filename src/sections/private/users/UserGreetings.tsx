import { Container, Typography } from '@mui/material';
import useAuth from '@/hooks/useAuth';

export default function UserGreetings() {
  const { user } = useAuth();

  return (
    <Container>
      <Typography>Bonjour, vous êtes connecté en tant que {user?.role} 🎉</Typography>
    </Container>
  );
}
