import React from 'react';
import PropTypes from 'prop-types';

const IconUndo = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-undo"
      data-name="svg-icon-undo"
      data-testid="svg-icon-undo"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M33,19.7A8.3,8.3,0,0,1,24.8,28H19.6V25.6h5.2a5.8,5.8,0,0,0,5.8-5.9,5.9,5.9,0,0,0-5.8-5.9H11v3.5L3,12.7,11,8v3.5H24.8A8.2,8.2,0,0,1,33,19.7Z" />
    </svg>
  );
};

IconUndo.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconUndo;
