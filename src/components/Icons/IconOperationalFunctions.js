import React from 'react';
import PropTypes from 'prop-types';

const IconOperationalFunctions = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-operational-functions"
      data-name="svg-icon-operational-functions"
      data-testid="svg-icon-operational-functions"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <circle cx="7" cy="11" r="4.5" />
      <circle cx="30" cy="11" r="4.5" />
      <path d="M7,5a6.4,6.4,0,0,1,2,.3V1.5C9,.7,8.1,0,7,0S5,.7,5,1.5V5.3A6.4,6.4,0,0,1,7,5Z" />
      <path d="M7,17a6.4,6.4,0,0,1-2-.3V34.5c0,.8.9,1.5,2,1.5s2-.7,2-1.5V16.7A6.4,6.4,0,0,1,7,17Z" />
      <path d="M18,20a6.4,6.4,0,0,1,2,.3V1.5C20,.7,19.1,0,18,0s-2,.7-2,1.5V20.3A6.4,6.4,0,0,1,18,20Z" />
      <path d="M18,32a6.4,6.4,0,0,1-2-.3v2.8c0,.8.9,1.5,2,1.5s2-.7,2-1.5V31.7A6.4,6.4,0,0,1,18,32Z" />
      <path d="M30,5a6.4,6.4,0,0,1,2,.3V1.5C32,.7,31.1,0,30,0s-2,.7-2,1.5V5.3A6.4,6.4,0,0,1,30,5Z" />
      <path d="M30,17a6.4,6.4,0,0,1-2-.3V34.5c0,.8.9,1.5,2,1.5s2-.7,2-1.5V16.7A6.4,6.4,0,0,1,30,17Z" />
      <circle cx="18" cy="26" r="4.5" />
    </svg>
  );
};

IconOperationalFunctions.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconOperationalFunctions;
