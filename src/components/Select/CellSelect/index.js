import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext, SelectContext } from '@context';

const Checkbox = styled.input`
  cursor: pointer;
`;

const CellSelect = React.memo(
  ({ item, className, indentation, children }) => {
    const theme = React.useContext(ThemeContext);
    const { selectState, onSelectById } = React.useContext(
      SelectContext
    );

    const isSelected = selectState.ids.includes(item.id);

    const handleChange = () => {
      onSelectById(item.id);
    };

    return (
      <CellContainer
        role="gridcell"
        className={cs('td', 'cell-select', 'th-shrink', className)}
        css={theme?.CellSelect}
        indentation={indentation}
      >
        <div>
          {children ? (
            React.cloneElement(children, {
              checked: isSelected,
              onChange: handleChange
            })
          ) : (
            <Checkbox
              type="checkbox"
              checked={isSelected}
              onChange={handleChange}
            />
          )}
        </div>
      </CellContainer>
    );
  }
);

CellSelect.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellSelect };
