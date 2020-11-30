import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext, SelectContext } from '@context';

const BodyContainer = styled.div`
  ${({ css }) => css};
`;

const getSelectProps = (child, { selectState, onSelectById }) => ({
  selectId: child.props.item.id,
  isSelected: selectState.ids.includes(child.props.item.id),
  onSelectById
});

const Body = ({ children }) => {
  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);

  return (
    <BodyContainer css={theme?.Body}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          ...getSelectProps(child, select)
        })
      )}
    </BodyContainer>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export { Body };
