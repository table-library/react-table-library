import React from 'react';
import PropTypes from 'prop-types';

const IconTimeControl = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-time-control"
      data-name="svg-icon-time-control"
      data-testid="svg-icon-time-control"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path
        d="M27.9,27.9A14,14,0,1,1,18,4"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="2.5"
      />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="2.5"
        strokeDasharray="2.93 2.93"
      />
      <g>
        <path
          d="M19.6,21.1l-1.9-1.2a2.6,2.6,0,0,1-.8-2V8.5h1.8v9.8l4.8,3.2-1.1,1.7Z"
          fillRule="evenodd"
        />
        <path d="M18.2,9v9.5l.5.3,4.1,2.9-.5.8-2.4-1.8L18,19.5a2,2,0,0,1-.6-1.6V9h.8m1-1H16.4v9.9a2.9,2.9,0,0,0,1.1,2.4l1.8,1.2,3.2,2.4,1.7-2.5-5-3.4V8Z" />
      </g>
    </svg>
  );
};

IconTimeControl.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconTimeControl;
