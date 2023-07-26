import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { LOGIN } from '@/graphql/users/mutations';
import useAuth from '@/hooks/useAuth';
import * as Yup from 'yup';
import { TODO } from '@/types';

export default function LoginForm() {
  const { onLoginSuccess } = useAuth();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: ({ login: result }) => {
      onLoginSuccess(result.token);
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Adresse email invalide').required("L'adresse email est requise"),
    password: Yup.string().required('Le mot de passe est requis'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema) as TODO,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (variables: TODO) => {
    try {
      await login({
        variables,
      });
    } catch {
      // eslint-disable-next-line no-alert
      alert('Invalid credentials');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField label="Adresse email" name="email" required />

        <RHFTextField label="Mot de passe" name="password" required type="password" />

        <LoadingButton loading={loading} size="large" type="submit" variant="contained">
          Connexion
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
