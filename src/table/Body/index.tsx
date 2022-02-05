import * as React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return <div>{children}</div>;
};

export { Body };
