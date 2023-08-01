import { TODO } from '@/types';
import { FormEventHandler, PropsWithChildren } from 'react';
import { FormProvider as Form } from 'react-hook-form';

interface Props {
  methods: TODO;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function FormProvider({ children, methods, onSubmit }: PropsWithChildren<Props>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
