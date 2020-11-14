import React from 'react';
import PropTypes from 'prop-types';

const IconEmergencyCircuitOpen = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-emergency-circuit-open"
      data-name="svg-icon-emergency-circuit-open"
      data-testid="svg-icon-emergency-circuit-open"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <circle cx="18" cy="18" r="18" fill="#f6bd16" />
      <path d="M18,34A16,16,0,1,1,34,18,16,16,0,0,1,18,34ZM18,5A13,13,0,1,0,31,18,13,13,0,0,0,18,5Z" />
      <path d="M18,30.6,7.6,11H28.4ZM10.9,13,18,26.4,25.1,13Z" />
      <text
        transform="translate(16 22.5)"
        fontSize="12"
        fontFamily="OpenSans-Regular, Open Sans, Arial"
        fontWeight="700"
      >
        !
      </text>
    </svg>
  );
};

IconEmergencyCircuitOpen.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconEmergencyCircuitOpen;
