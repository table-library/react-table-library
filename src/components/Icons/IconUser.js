import React from 'react';
import PropTypes from 'prop-types';

const IconUser = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-user"
      data-name="svg-icon-user"
      data-testid="svg-icon-user"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M32,32.1V33H4v-.9c0-4.2,3.8-8,9.3-9.6v-.3c-3.7-2.2-3.7-6.7-3.7-10S10.5,3,18,3s8.4,5.2,8.4,9.2,0,7.8-3.7,10.1v.2C28.2,24.1,32,27.9,32,32.1Z" />
    </svg>
  );
};

IconUser.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconUser;
