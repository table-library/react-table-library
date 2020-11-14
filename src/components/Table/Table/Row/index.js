import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

const RowContainer = styled.div`
  display: flex;
  align-items: center;

  padding-left: 52px;
  padding-right: 16px;
`;

const Row = ({ disabled, children }) => {
  return (
    <RowContainer
      className={cs('tr', {
        disabled
      })}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          noIndent: index === 0,
          noBorder: index === React.Children.count(children) - 1
        })
      )}
    </RowContainer>
  );
};

Row.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const HeaderRow = Row;

export { Row, HeaderRow };
