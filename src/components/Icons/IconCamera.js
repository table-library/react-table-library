import React from 'react';
import PropTypes from 'prop-types';

const IconCamera = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-camera"
      data-name="svg-icon-camera"
      data-testid="svg-icon-camera"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M33.1,11H27.5a.9.9,0,0,1-.8-.4L23.3,5.4a.9.9,0,0,0-.8-.4h-9a.9.9,0,0,0-.8.4L9.3,10.6a.9.9,0,0,1-.8.4H2.9a.9.9,0,0,0-.9.9V30.1a.9.9,0,0,0,.9.9H33.1a.9.9,0,0,0,.9-.9V11.9A.9.9,0,0,0,33.1,11ZM18,25a7,7,0,1,1,7-7A7,7,0,0,1,18,25Z" />
    </svg>
  );
};

IconCamera.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconCamera;
