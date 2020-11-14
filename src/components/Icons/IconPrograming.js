import React from 'react';
import PropTypes from 'prop-types';

const IconProgramming = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-programming"
      data-name="svg-icon-programming"
      data-testid="svg-icon-programming"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M10.5,27.5a1.3,1.3,0,0,1-1-.4L.4,19a1.5,1.5,0,0,1,0-2l.2-.2L9.5,8.9a1.5,1.5,0,0,1,2.1.1,1.5,1.5,0,0,1-.1,2.1L3.7,18l7.8,6.9a1.5,1.5,0,0,1,.1,2.1A1.6,1.6,0,0,1,10.5,27.5Z" />
      <path d="M14.9,36h-.4a2.2,2.2,0,0,1-1.1-2.5L19.7,1.5c.2-1.1,1-1.7,1.8-1.4a2.2,2.2,0,0,1,1.1,2.5L16.3,34.5A1.5,1.5,0,0,1,14.9,36Z" />
      <path d="M25.5,27.5a1.6,1.6,0,0,1-1.1-.5,1.5,1.5,0,0,1,.1-2.1L32.3,18l-7.8-6.9A1.5,1.5,0,0,1,24.4,9a1.5,1.5,0,0,1,2.1-.1L35.6,17a1.5,1.5,0,0,1,0,2l-.2.2-8.9,7.9A1.3,1.3,0,0,1,25.5,27.5Z" />
    </svg>
  );
};

IconProgramming.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconProgramming;
