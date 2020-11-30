import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext, SelectContext } from '@context';

const CellSelect = React.memo(
  ({ item, width, className, indentation, children }) => {
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
        className={cs('td', 'cell-select', 'shrink', className)}
        css={theme?.CellSelect}
        width={width}
        indentation={indentation}
      >
        <div>
          {children ? (
            React.cloneElement(children, {
              checked: isSelected,
              onChange: handleChange
            })
          ) : (
            <input
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
  width: PropTypes.string,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellSelect };
