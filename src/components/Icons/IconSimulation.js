import React from 'react';
import PropTypes from 'prop-types';

const IconSimulation = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-simulation"
      data-name="svg-icon-simulation"
      data-testid="svg-icon-simulation"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect width="36" height="36" fill="#fff" />
      <polygon points="34 34.4 1.6 34.4 1.6 2 2.4 2 2.4 33.6 34 33.6 34 34.4" />
      <path
        d="M9,32l-.6-.2a1,1,0,0,1-.2-1.4l20-24a1,1,0,1,1,1.6,1.2l-20,24A.9.9,0,0,1,9,32Z"
        fill="#39b54a"
      />
      <path
        d="M4.5,31.5l-.6-.2a1,1,0,0,1-.2-1.4l6.7-8.1a2,2,0,0,1,1.5-.7,1.8,1.8,0,0,1,1.6.5l3.4,3.2h.3l5.9-7.1a2,2,0,0,1,1.5-.7,1.9,1.9,0,0,1,1.5.6l6.6,7.3a1,1,0,0,1-1.4,1.4L24.7,19h-.1l-5.9,7.1a2,2,0,0,1-1.5.7,1.8,1.8,0,0,1-1.6-.5l-3.4-3.2h-.3l-6.6,8A.9.9,0,0,1,4.5,31.5Z"
        fill="#0071bc"
      />
    </svg>
  );
};

IconSimulation.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconSimulation;
