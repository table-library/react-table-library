import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BodyContainer = styled.div`
  .tr {
    color: #7b7d7e;

    &:hover * {
      color: #141414;
    }

    &.disabled {
      color: #141414;
    }

    &:nth-child(odd) {
      background-color: #d2e9fb;
    }

    &:nth-child(even) {
      background-color: #eaf5fd;
    }
  }
`;

const Body = ({ children }) => {
  return <BodyContainer>{children}</BodyContainer>;
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
