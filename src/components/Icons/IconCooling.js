import React from 'react';
import PropTypes from 'prop-types';

const IconCooling = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-cooling"
      data-name="svg-icon-cooling"
      data-testid="svg-icon-cooling"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M34.5,20.5a1.6,1.6,0,0,1-1,1.9l-3.4.9L33,25a1.4,1.4,0,0,1,.6,2,1.6,1.6,0,0,1-1.3.8,1.3,1.3,0,0,1-.8-.3l-2.9-1.6.9,3.3a1.4,1.4,0,0,1-1,1.8h-.4A1.6,1.6,0,0,1,26.6,30l-1.7-6.3-5.4-3.1v6.3l4.6,4.5a1.6,1.6,0,0,1,0,2.2A2.1,2.1,0,0,1,23,34a2.1,2.1,0,0,1-1.1-.4l-2.4-2.5v3.4a1.5,1.5,0,0,1-3,0V31.1l-2.4,2.5A2.1,2.1,0,0,1,13,34a2.1,2.1,0,0,1-1.1-.4,1.6,1.6,0,0,1,0-2.2l4.6-4.5V20.6l-5.4,3.1L9.4,30a1.6,1.6,0,0,1-1.5,1.1H7.5a1.5,1.5,0,0,1-1-1.8l.9-3.3L4.5,27.5a1.3,1.3,0,0,1-.8.3A1.6,1.6,0,0,1,2.4,27,1.4,1.4,0,0,1,3,25l2.9-1.7-3.4-.9a1.7,1.7,0,0,1-1-1.9,1.4,1.4,0,0,1,1.8-1l6.3,1.6L15,18,9.6,14.9,3.3,16.5H2.9a1.6,1.6,0,0,1-1.4-1.1,1.6,1.6,0,0,1,1-1.9l3.4-.9L3,11a1.4,1.4,0,0,1-.6-2,1.5,1.5,0,0,1,2.1-.5l2.9,1.6L6.5,6.8A1.5,1.5,0,0,1,7.5,5,1.5,1.5,0,0,1,9.4,6l1.7,6.3,5.4,3.1V9.1L11.9,4.6a1.6,1.6,0,0,1,2.2-2.2l2.4,2.5V1.5a1.5,1.5,0,0,1,3,0V4.9l2.4-2.5a1.6,1.6,0,0,1,2.2,2.2L19.5,9.1v6.3l5.4-3.1L26.6,6a1.5,1.5,0,0,1,1.9-1,1.4,1.4,0,0,1,1,1.8l-.9,3.3,2.9-1.6a1.5,1.5,0,0,1,2.1.5,1.4,1.4,0,0,1-.6,2l-2.9,1.7,3.4.9a1.5,1.5,0,0,1,1,1.9,1.6,1.6,0,0,1-1.4,1.1h-.4l-6.3-1.6L21,18l5.4,3.1,6.3-1.6A1.4,1.4,0,0,1,34.5,20.5Z" />
    </svg>
  );
};

IconCooling.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconCooling;
