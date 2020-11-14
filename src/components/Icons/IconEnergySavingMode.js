import React from 'react';
import PropTypes from 'prop-types';

const IconEnergySavingMode = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-energy-saving-mode"
      data-name="svg-icon-energy-saving-mode"
      data-testid="svg-icon-energy-saving-mode"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect x="12" y="30.5" width="12" height="2" />
      <path d="M23,33.5c0,1.4-2.2,2.5-5,2.5s-5-1.1-5-2.5" />
      <path d="M31.9,11.6A14,14,0,0,0,19.6.1,14,14,0,0,0,8.5,3.6,13.3,13.3,0,0,0,4,13.5a13.5,13.5,0,0,0,7,11.8,1.8,1.8,0,0,1,1,1.5v2.7H24V26.8a1.8,1.8,0,0,1,1-1.5,13.6,13.6,0,0,0,7-11.8A12.1,12.1,0,0,0,31.9,11.6Zm-13.4,6,2.4-2.8a.5.5,0,1,0-.8-.6l-1.6,1.9V12.5a.5.5,0,0,0-1,0V23.6l-3.6-6.2a4.6,4.6,0,0,1,.1-4.7l4-6.3,4,6.3a4.6,4.6,0,0,1,.1,4.7l-3.6,6.2ZM24,23.5a4,4,0,0,0-2,3.3v.7H18.5V25.6l4.4-7.7a5.3,5.3,0,0,0-.1-5.7L18,4.6l-4.8,7.6a5.3,5.3,0,0,0-.1,5.7l4.4,7.7v1.9H14v-.7a4,4,0,0,0-2-3.3,11.5,11.5,0,0,1-6-10A11.4,11.4,0,0,1,9.8,5.1a12.4,12.4,0,0,1,9.6-3,12,12,0,0,1,7,3.2,11.5,11.5,0,0,1,3.5,6.6A11.3,11.3,0,0,1,24,23.5Z" />
    </svg>
  );
};

IconEnergySavingMode.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconEnergySavingMode;
