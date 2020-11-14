import React from 'react';
import PropTypes from 'prop-types';

const IconAbort = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-abort"
      data-name="svg-icon-abort"
      data-testid="svg-icon-abort"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M18,3A15,15,0,1,0,33,18,15,15,0,0,0,18,3Zm0,3.3A11.8,11.8,0,0,1,29.7,18a11.6,11.6,0,0,1-2.4,7L11,8.7A11.6,11.6,0,0,1,18,6.3Zm0,23.4A11.8,11.8,0,0,1,6.3,18a11.6,11.6,0,0,1,2.4-7L25,27.3A11.6,11.6,0,0,1,18,29.7Z" />
      <line x1="6.3" y1="6.3" x2="6.3" y2="6.3" fill="none" />
    </svg>
  );
};

IconAbort.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconAbort;
