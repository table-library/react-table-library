import React from 'react';
import PropTypes from 'prop-types';

const IconPlus = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-plus"
      data-name="svg-icon-plus"
      data-testid="svg-icon-plus"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 16 36 20 20 20 20 36 16 36 16 20 0 20 0 16 16 16 16 0 20 0 20 16 36 16" />
    </svg>
  );
};

IconPlus.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconPlus;
