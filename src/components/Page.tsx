import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
}

const Page = ({ children, title }: PropsWithChildren<Props>) => (
  <>
    <Helmet>
      <title>{`${title} | Client`}</title>
    </Helmet>
    {children}
  </>
);

export default Page;
