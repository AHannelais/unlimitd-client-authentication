import { TODO } from '@/types';
import { PropsWithChildren } from 'react';
import { FormProvider as Form } from 'react-hook-form';

interface Props {
  methods: TODO;
  onSubmit: TODO;
}

const FormProvider = ({ children, methods, onSubmit }: PropsWithChildren<Props>) => (
  <Form {...methods}>
    <form onSubmit={onSubmit}>{children}</form>
  </Form>
);

export default FormProvider;
