import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
}

export default function Page({ children, title }: PropsWithChildren<Props>) {
  return (
    <>
      <Helmet>
        <title>{`${title} | Client`}</title>
      </Helmet>
      {children}
    </>
  );
}
