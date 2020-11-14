import React from 'react';
import PropTypes from 'prop-types';

const IconWaterTemperature = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-water-temperature"
      data-name="svg-icon-water-temperature"
      data-testid="svg-icon-water-temperature"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M19.5,11v2H24a1.1,1.1,0,0,1,1,1,1.1,1.1,0,0,1-1,1H19.5V25.4A3,3,0,0,1,21,28a3,3,0,0,1-6,0,3,3,0,0,1,1.5-2.6V1.5a1.5,1.5,0,0,1,3,0V5H24a1.1,1.1,0,0,1,1,1,1.1,1.1,0,0,1-1,1H19.5V9H24a1.1,1.1,0,0,1,1,1,1.1,1.1,0,0,1-1,1Z" />
      <path d="M28.6,35.6l-3.3-1.4a3.9,3.9,0,0,0-2.6,0l-3.4,1.4a3,3,0,0,1-2.6,0l-3.4-1.4a3.9,3.9,0,0,0-2.6,0L7.4,35.6a3.5,3.5,0,0,1-3-.2L.7,33.3a1.2,1.2,0,0,1-.4-1.8,1.5,1.5,0,0,1,2-.4l2.4,1.4a3.5,3.5,0,0,0,3,.1l3-1.3a3.9,3.9,0,0,1,2.6,0l3.4,1.5a3.9,3.9,0,0,0,2.6,0l3.4-1.5a3.9,3.9,0,0,1,2.6,0l3,1.3a3.5,3.5,0,0,0,3-.1l2.4-1.4a1.5,1.5,0,0,1,2,.4,1.2,1.2,0,0,1-.4,1.8l-3.7,2.1A3.5,3.5,0,0,1,28.6,35.6Z" />
      <path d="M13.5,28a3.4,3.4,0,0,1,.4-1.8l-.6-.3a3.9,3.9,0,0,0-2.6,0l-3,1.3a3.2,3.2,0,0,1-3-.2L2.3,25.7a1.5,1.5,0,0,0-2,.4,1.2,1.2,0,0,0,.4,1.8L4.4,30a3.5,3.5,0,0,0,3,.2l3.3-1.4a3,3,0,0,1,2.6,0h.3A2.8,2.8,0,0,1,13.5,28Z" />
      <path d="M35.7,26.1a1.5,1.5,0,0,0-2-.4L31.3,27a3.2,3.2,0,0,1-3,.2l-3-1.3a3.9,3.9,0,0,0-2.6,0l-.6.3a3.4,3.4,0,0,1,.4,1.8,2.8,2.8,0,0,1-.1.9h.3a3,3,0,0,1,2.6,0l3.3,1.4a3.5,3.5,0,0,0,3-.2l3.7-2.1A1.2,1.2,0,0,0,35.7,26.1Z" />
    </svg>
  );
};

IconWaterTemperature.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconWaterTemperature;
