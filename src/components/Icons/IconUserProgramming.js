import React from 'react';
import PropTypes from 'prop-types';

const IconUserProgramming = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-user-programming"
      data-name="svg-icon-user-programming"
      data-testid="svg-icon-user-programming"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polyline
        points="21.7 25.4 16.7 29 21.7 32.6"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polyline
        points="29.3 32.6 34.3 29 29.3 25.4"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        x1="26.7"
        y1="23"
        x2="24.7"
        y2="34"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <g>
        <path d="M27.3,33a2,2,0,0,1,.8-2.1L30.8,29l-2.7-1.9c0-.1,0-.1-.1-.1l-1,6Z" />
        <path d="M13.3,29l7.3-5.2a2,2,0,1,1,2.3,3.3L20.2,29l2.7,1.9.3.3,1.5-8-2-.7v-.2c3.7-2.3,3.7-6.8,3.7-10.1S25.5,3,18,3,9.6,8.2,9.6,12.2s0,7.8,3.7,10v.3C7.8,24.1,4,27.9,4,32.1V33H18.9Z" />
      </g>
    </svg>
  );
};

IconUserProgramming.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconUserProgramming;
