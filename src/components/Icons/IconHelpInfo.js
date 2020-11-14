import React from 'react';
import PropTypes from 'prop-types';

const IconHelpInfo = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-help-info"
      data-name="svg-icon-help-info"
      data-testid="svg-icon-help-info"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M11,0A11,11,0,0,0,3.8,19.3L.9,23l5.4-2.1A10.5,10.5,0,0,0,11,22a10.7,10.7,0,0,0,2.5-.3,11.7,11.7,0,0,1,8.2-8.2A10.7,10.7,0,0,0,22,11,11,11,0,0,0,11,0Zm.9,17.8a1.7,1.7,0,0,1-1.2.5,1.7,1.7,0,0,1-1.3-.5,1.7,1.7,0,0,1-.5-1.2,1.7,1.7,0,0,1,.5-1.3,2.2,2.2,0,0,1,1.3-.4,1.7,1.7,0,0,1,1.2.5c.3.2.4.6.4,1.2A1.6,1.6,0,0,1,11.9,17.8Zm3.2-8.9a7.5,7.5,0,0,1-1.8,1.8l-1.2,1a1.7,1.7,0,0,0-.3,1v.6H9.3v-.8a2.9,2.9,0,0,1,.4-1.6,3.9,3.9,0,0,1,1.4-1.5,6.3,6.3,0,0,0,1.4-1.2,1.7,1.7,0,0,0,.3-1,1.4,1.4,0,0,0-.5-1A2.3,2.3,0,0,0,11,5.9a6.5,6.5,0,0,0-3.3,1L6.6,4.7a9.6,9.6,0,0,1,4.6-1.2,4.6,4.6,0,0,1,3.2,1A3,3,0,0,1,15.6,7,2.9,2.9,0,0,1,15.1,8.9Z" />
      <path d="M25,14A11,11,0,1,0,36,25,11,11,0,0,0,25,14Zm0,3.5a1.6,1.6,0,0,1,1.6,1.6,1.7,1.7,0,0,1-1.7,1.5,1.5,1.5,0,0,1-1.5-1.5A1.6,1.6,0,0,1,25,17.5ZM27.9,32H22.4v-.7c1.2-.2,1.3-.2,1.3-1.8V25.2c0-1.5-.1-1.6-1.2-1.7v-.7l4-.8v7.5c0,1.5.1,1.6,1.4,1.8Z" />
    </svg>
  );
};

IconHelpInfo.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconHelpInfo;
