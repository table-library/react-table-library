import React from 'react';
import PropTypes from 'prop-types';

const IconMaintenanceRequired = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-maintenance-required"
      data-name="svg-icon-maintenance-required"
      data-testid="svg-icon-maintenance-required"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M32.4,8.8a1.1,1.1,0,0,0,1.1-.3L35.9,6a7.1,7.1,0,0,1-2,6.1,6.9,6.9,0,0,1-7.1,1.7,1.1,1.1,0,0,0-1.1.3L4.1,35.7a1.2,1.2,0,0,1-1.6,0L.3,33.5a1.2,1.2,0,0,1,0-1.6L21.9,10.3a1.1,1.1,0,0,0,.3-1.1,6.9,6.9,0,0,1,1.7-7.1A7.1,7.1,0,0,1,30,.1L27.5,2.5a1.1,1.1,0,0,0-.3,1.1l.9,3.5a1.1,1.1,0,0,0,.8.8Z" />
    </svg>
  );
};

IconMaintenanceRequired.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconMaintenanceRequired;
