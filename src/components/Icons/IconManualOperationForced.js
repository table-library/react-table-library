import React from 'react';
import PropTypes from 'prop-types';

const IconManualOperationForced = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-manual-operation-forced"
      data-name="svg-icon-manual-operation-forced"
      data-testid="svg-icon-manual-operation-forced"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M9.5,1A8.5,8.5,0,1,1,1,9.5,8.5,8.5,0,0,1,9.5,1m0-1A9.6,9.6,0,0,0,0,9.5,9.6,9.6,0,0,0,9.5,19,9.6,9.6,0,0,0,19,9.5,9.6,9.6,0,0,0,9.5,0Z" />
      <circle cx="9.5" cy="15.5" r="1.5" />
      <polygon points="10.5 12 8.5 12 8 3 11 3 10.5 12" />
      <path d="M36,14.9V27.6c0,4.7-4.3,8.4-8.7,8.4a7.9,7.9,0,0,1-7.2-4.7l-5.9-8.1a1.1,1.1,0,0,1,.1-1.6,2.4,2.4,0,0,1,1.4-.5,2.1,2.1,0,0,1,1.7.8L21,26.7V11.6A1.5,1.5,0,0,1,22.6,10,1.5,1.5,0,0,1,24,11.6V21h1V9.4a1.5,1.5,0,0,1,1.6-1.6A1.5,1.5,0,0,1,28,9.4V21h1V11.6A1.5,1.5,0,0,1,30.6,10,1.5,1.5,0,0,1,32,11.6V21h1V14.9a1.5,1.5,0,0,1,1.6-1.6A1.5,1.5,0,0,1,36,14.9Z" />
    </svg>
  );
};

IconManualOperationForced.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconManualOperationForced;
