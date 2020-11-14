import React from 'react';
import PropTypes from 'prop-types';

const IconRowDown = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-down"
      data-name="svg-icon-row-down"
      data-testid="svg-icon-row-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="23 26 18 34.5 13 26 16.5 26 16.5 14.5 19.5 14.5 19.5 26 23 26" />
      <polygon points="36 21.5 22 21.5 22 19.5 34 19.5 34 10.5 2 10.5 2 19.5 14 19.5 14 21.5 0 21.5 0 8.5 36 8.5 36 21.5" />
    </svg>
  );
};

IconRowDown.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowDown;
