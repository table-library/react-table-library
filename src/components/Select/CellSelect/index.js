import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext } from '@context';

const CellSelect = React.memo(
  ({
    id,
    isSelected,
    onSelectById,
    width,
    className,
    indentation,
    children
  }) => {
    const theme = React.useContext(ThemeContext);

    const handleChange = () => {
      onSelectById(id);
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
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectById: PropTypes.func.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { CellSelect };
