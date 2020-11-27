import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RowBase = ({ children }) => {
  return React.Children.map(children, child =>
    React.cloneElement(child)
  );
};

RowBase.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { RowBase, RowContainer };
