import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext, SelectContext, ExpandContext } from '@context';

const BodyContainer = styled.div`
  ${({ css }) => css};
`;

const getCommonProps = child => ({
  id: child.props.item.id
});

const getSelectProps = (child, { selectState, onSelectById }) => ({
  isSelected: selectState.ids.includes(child.props.item.id),
  onSelectById
});

const getExpandProps = (child, { expandState, onExpandById }) => ({
  isExpanded: expandState.ids.includes(child.props.item.id),
  onExpandById
});

const Body = ({ children }) => {
  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);
  const expand = React.useContext(ExpandContext);

  return (
    <BodyContainer css={theme?.Body}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          ...getCommonProps(child),
          ...getSelectProps(child, select),
          ...getExpandProps(child, expand)
        })
      )}
    </BodyContainer>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

export { Body };
