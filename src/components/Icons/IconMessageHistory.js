import React from 'react';
import PropTypes from 'prop-types';

const IconMessageHistory = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-note"
      data-name="svg-icon-note"
      data-testid="svg-icon-note"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M28.5,6.8V8L15.2,17.3a1.7,1.7,0,0,1-1.9,0L0,8V6.8A.9.9,0,0,1,.8,6H27.7A.9.9,0,0,1,28.5,6.8Z" />
      <polygon points="9 15.7 0 22 0 9.4 9 15.7" />
      <g>
        <path d="M28.5,17V9.4l-9,6.3L24,18.8A7.9,7.9,0,0,1,28.5,17Z" />
        <path d="M18.5,16.4l-3.3,2.4a2.1,2.1,0,0,1-1.9,0L10,16.4l-10,7v.8a.9.9,0,0,0,.8.8H21a8.1,8.1,0,0,1,2.1-5.4Z" />
      </g>
      <path
        d="M35.5,25A6.5,6.5,0,1,1,29,18.5,6.5,6.5,0,0,1,35.5,25Zm-3.1.6-2.2-1.3V20.1H27.8V25a1.3,1.3,0,0,0,.6,1.1h0l2.8,1.6Z"
        stroke="#000"
        fillRule="evenodd"
      />
    </svg>
  );
};

IconMessageHistory.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconMessageHistory;
