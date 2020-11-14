import React from 'react';
import PropTypes from 'prop-types';

const IconRemoteDesktop = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-remote-desktop"
      data-name="svg-icon-remote-desktop"
      data-testid="svg-icon-remote-desktop"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M34,0H2A2,2,0,0,0,0,2V27a2,2,0,0,0,2,2H16v4H9.1C8,33,7,33.7,7,34.5V36H29V34.5c0-.8-1-1.5-2.1-1.5H20V29H34a2,2,0,0,0,2-2V2A2,2,0,0,0,34,0Zm0,27H2V2H34Z" />
    </svg>
  );
};

IconRemoteDesktop.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRemoteDesktop;
