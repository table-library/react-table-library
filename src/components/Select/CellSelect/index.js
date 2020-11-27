import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext, SelectContext } from '@context';

const CellSelect = ({
  selectId,
  width,
  className,
  indentation
  // children
}) => {
  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);

  const { selectState, onSelectById } = select;

  const handleChange = () => {
    onSelectById(selectId);
  };

  return (
    <CellContainer
      className={cs('td', 'shrink', className)}
      css={theme?.CellSelect}
      width={width}
      indentation={indentation}
    >
      <div>
        <input
          type="checkbox"
          checked={selectState.ids.includes(selectId)}
          onChange={handleChange}
        />
      </div>
    </CellContainer>
  );
};

CellSelect.propTypes = {
  selectId: PropTypes.string.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
  indentation: PropTypes.number
  // children: PropTypes.node
};

export { CellSelect };
