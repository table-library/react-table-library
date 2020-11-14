import React from 'react';
import PropTypes from 'prop-types';

const IconWarmingUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-warming-up"
      data-name="svg-icon-warming-up"
      data-testid="svg-icon-warming-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect y="33" width="36" height="3" />
      <path d="M2.5,32.5a1.6,1.6,0,0,1-.9-.3,1.6,1.6,0,0,1-.3-2.1,24.6,24.6,0,0,1,2.8-2.8c1.9-1.8,4.4-4,4-5.6s-1.9-3-3.4-4.5S1.5,14,1.1,12,2.2,6.2,8.6.9a1.5,1.5,0,0,1,2.1.1,1.5,1.5,0,0,1-.2,2.1C3.8,8.8,3.7,9.9,4,11.3s1.6,2.5,2.9,3.8S10.4,18.7,11,21s-2.3,6.2-4.9,8.5a17.9,17.9,0,0,0-2.4,2.4A1.4,1.4,0,0,1,2.5,32.5Z" />
      <path d="M14.5,32.5a1.6,1.6,0,0,1-.9-.3,1.6,1.6,0,0,1-.3-2.1,24.6,24.6,0,0,1,2.8-2.8c1.9-1.8,4.4-4,4-5.6s-1.9-3-3.4-4.5S13.5,14,13.1,12,14.2,6.2,20.6.9a1.5,1.5,0,0,1,2.1.1,1.5,1.5,0,0,1-.2,2.1c-6.7,5.7-6.8,6.8-6.5,8.2s1.6,2.5,2.9,3.8S22.4,18.7,23,21s-2.3,6.2-4.9,8.5a17.9,17.9,0,0,0-2.4,2.4A1.4,1.4,0,0,1,14.5,32.5Z" />
      <path d="M26.5,32.5a1.6,1.6,0,0,1-.9-.3,1.6,1.6,0,0,1-.3-2.1,24.6,24.6,0,0,1,2.8-2.8c1.9-1.8,4.4-4,4-5.6s-1.9-3-3.4-4.5S25.5,14,25.1,12,26.2,6.2,32.6.9a1.5,1.5,0,0,1,2.1.1,1.5,1.5,0,0,1-.2,2.1c-6.7,5.7-6.8,6.8-6.5,8.2s1.6,2.5,2.9,3.8S34.4,18.7,35,21s-2.3,6.2-4.9,8.5a17.9,17.9,0,0,0-2.4,2.4A1.4,1.4,0,0,1,26.5,32.5Z" />
    </svg>
  );
};

IconWarmingUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconWarmingUp;
