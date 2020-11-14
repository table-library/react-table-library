import React from 'react';
import PropTypes from 'prop-types';

const IconTempOff = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-temp-off"
      data-name="svg-icon-temp-off"
      data-testid="svg-icon-temp-off"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect x="16.1" y="3.4" width="2.5" height="13.33" />
      <path d="M30.6,18.5A13.2,13.2,0,0,0,22.3,6.9V9.6A10.9,10.9,0,0,1,28,17.4a5,5,0,0,0-1.7-.2,7.6,7.6,0,0,0-7.7,7.7,7.4,7.4,0,0,0,1.7,4.8,15.4,15.4,0,0,1-3,.4A10.9,10.9,0,0,1,6.5,19.3a11.2,11.2,0,0,1,5.8-9.7V6.9A13.5,13.5,0,0,0,4,19.3,13.4,13.4,0,0,0,17.3,32.6a15,15,0,0,0,5.2-1,8,8,0,0,0,3.8,1A7.8,7.8,0,0,0,34,24.9,7.6,7.6,0,0,0,30.6,18.5Zm-2,8.8-2.4-1.4-.4-.2a1,1,0,0,1-.5-.8V19.8h1.9v4.5l2.4,1.4Z" />
    </svg>
  );
};

IconTempOff.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconTempOff;
