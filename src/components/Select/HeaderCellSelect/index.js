import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext, SelectContext } from '@context';

const HeaderCellSelect = ({ width, className }) => {
  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);

  const { selectState, onSelectAll } = select;

  const handleChange = () => {
    onSelectAll();
  };

  const checkboxRef = node => {
    if (!node) return;

    if (selectState.allSelected) {
      node.indeterminate = false;
      node.checked = true;
    } else if (selectState.noneSelected) {
      node.indeterminate = false;
      node.checked = false;
    } else {
      node.indeterminate = true;
      node.checked = false;
    }
  };

  return (
    <CellContainer
      className={cs('td', 'shrink', className)}
      css={theme?.HeaderCellSelect}
      width={width}
    >
      <div>
        <input
          ref={checkboxRef}
          type="checkbox"
          onChange={handleChange}
        />
      </div>
    </CellContainer>
  );
};

HeaderCellSelect.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string
  // children: PropTypes.node
};

export { HeaderCellSelect };
