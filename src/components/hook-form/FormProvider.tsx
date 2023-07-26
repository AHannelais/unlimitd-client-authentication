import { TODO } from '@/types';
import { PropsWithChildren } from 'react';
import { FormProvider as Form } from 'react-hook-form';

interface Props {
  methods: TODO;
  onSubmit: TODO;
}

export default function FormProvider({ children, methods, onSubmit }: PropsWithChildren<Props>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
