import React from 'react';
import PropTypes from 'prop-types';

const IconUndoAll = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-undo-all"
      data-name="svg-icon-undo-all"
      data-testid="svg-icon-undo-all"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect x="3.6" y="8.1" width="2.4" height="9.17" />
      <path d="M33,19.7A8.3,8.3,0,0,1,24.8,28H19.6V25.6h5.2a5.8,5.8,0,0,0,5.8-5.9,5.9,5.9,0,0,0-5.8-5.9H19.5v3.6L14,14.2v3.1L6,12.6,14,8v3.3l5.5-3.2v3.4h5.3A8.2,8.2,0,0,1,33,19.7Z" />
    </svg>
  );
};

IconUndoAll.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconUndoAll;
