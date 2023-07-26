import { Box, Stack, Typography } from '@mui/material';
import CenteredContent from '@/components/CenteredContent';
import Page from '@/components/Page';
import LoginForm from '@/sections/auth/login/LoginForm';

const Login = () => (
  <Page title="Login">
    <CenteredContent>
      <Box maxWidth={450}>
        <Stack alignItems="center" direction="row" sx={{ mb: 5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4">
              Connexion
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Utilisez les identifiants de démonstration pour vous connecter
            </Typography>
          </Box>
        </Stack>

        <LoginForm />
      </Box>
    </CenteredContent>
  </Page>
);

export default Login;
