import * as React from 'react';
import { linkTo } from '@storybook/addon-links';
import styled from 'styled-components';

const ButtonAsLink = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
`;

export const DocumentationSee = ({ anchor, noLink = false }) => {
  return (
    <small style={{ width: '100%' }}>
      For more documentation, see{' '}
      {noLink ? anchor : <ButtonAsLink onClick={linkTo(anchor)}>{anchor}</ButtonAsLink>}
    </small>
  );
};
