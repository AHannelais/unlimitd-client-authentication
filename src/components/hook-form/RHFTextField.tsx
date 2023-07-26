import { TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// TODO : fix this
interface Props extends ComponentProps<typeof TextField> {
  name: string;
}

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} fullWidth helperText={error?.message} {...other} />
      )}
    />
  );
}
