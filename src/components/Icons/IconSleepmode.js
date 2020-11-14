import React from 'react';
import PropTypes from 'prop-types';

const IconSleepmode = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-sleepmode"
      data-name="svg-icon-sleepmode"
      data-testid="svg-icon-sleepmode"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path
        d="M18.3,33H16.7A15.1,15.1,0,0,1,3.1,19.3,15.5,15.5,0,0,1,13.8,3a1.3,1.3,0,0,1,1.3.5A1,1,0,0,1,15,4.8a11.5,11.5,0,0,0-2.7,7.3A11.4,11.4,0,0,0,23.9,23.3a11.3,11.3,0,0,0,7.3-2.5,1.1,1.1,0,0,1,1.3,0A1.1,1.1,0,0,1,33,22,15.4,15.4,0,0,1,18.3,33ZM12.6,5.3A13.8,13.8,0,0,0,4.7,19.1,13.8,13.8,0,0,0,16.9,31.3a13.8,13.8,0,0,0,13.9-8.2A12.8,12.8,0,0,1,23.9,25,13.1,13.1,0,0,1,10.6,12.1,12.6,12.6,0,0,1,12.6,5.3Z"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="0.25"
      />
      <path d="M17.2,18.8v-.7l3.2-4.3H18V13h4.2v.9L19,18h3.2v.8Z" />
      <path d="M23.8,13.8V12.6l4.3-5.4H24.7V5.5h5.8V6.8l-4.4,5.4h4.4v1.6Z" />
    </svg>
  );
};

IconSleepmode.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconSleepmode;
