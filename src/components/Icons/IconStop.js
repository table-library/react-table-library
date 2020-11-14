import React from 'react';
import PropTypes from 'prop-types';

const IconStop = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-stop"
      data-name="svg-icon-stop"
      data-testid="svg-icon-stop"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect x="8" y="8" width="20" height="20" />
    </svg>
  );
};

IconStop.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconStop;
