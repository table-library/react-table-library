import React from 'react';
import PropTypes from 'prop-types';

const IconUserMaintenance = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-user-maintenance"
      data-name="svg-icon-user-maintenance"
      data-testid="svg-icon-user-maintenance"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M16,21.8a2,2,0,0,1,2-2h2.2V18.5A1.5,1.5,0,0,1,21.7,17h4.4a26.3,26.3,0,0,0,.3-4.8c0-4-.9-9.2-8.4-9.2S9.6,8.2,9.6,12.2s0,7.8,3.7,10v.3C7.8,24.1,4,27.9,4,32.1V33H16Z" />
      <path d="M32.8,20.9H29.6V18.5a.5.5,0,0,0-.5-.4H21.7a.5.5,0,0,0-.5.4v2.4H18a.9.9,0,0,0-.9.9V25H33.7V21.8A.9.9,0,0,0,32.8,20.9ZM22.2,19h6.5v1.9H22.2Z" />
      <polygon points="33.7 25.9 33.7 34.7 17.1 34.7 17.1 25.9 19.4 25.9 19.4 27.3 23.1 27.3 23.1 25.9 27.7 25.9 27.7 27.3 31.4 27.3 31.4 25.9 33.7 25.9" />
    </svg>
  );
};

IconUserMaintenance.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconUserMaintenance;
