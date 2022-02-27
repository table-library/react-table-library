import * as React from 'react';
import { linkTo } from '@storybook/addon-links';
import { styled } from '@stitches/react';

const Button = styled('button', {
  background: 'none !important',
  border: 'none',
  padding: '0 !important',
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const DocumentationSee = ({ anchor, noLink = false }) => {
  return (
    <small style={{ width: '100%' }}>
      For more documentation, see{' '}
      {noLink ? anchor : <Button onClick={linkTo(anchor)}>{anchor}</Button>}
    </small>
  );
};
