import React from 'react';
import PropTypes from 'prop-types';

const IconFileBrowser = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-file-browser"
      data-name="svg-icon-file-browser"
      data-testid="svg-icon-file-browser"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M16.4,21.8a8.4,8.4,0,0,1,8.4-8.4,8.3,8.3,0,0,1,7,3.7V12.4L28.4,9H16L12.8,5.9H6.2L2.8,9.3V28.6H20A8.2,8.2,0,0,1,16.4,21.8Z" />
      <path d="M30.9,26.1a7.6,7.6,0,0,0,1.4-4.3,7.5,7.5,0,0,0-7.5-7.4,7.4,7.4,0,0,0,0,14.8,7.1,7.1,0,0,0,4.3-1.4l4.3,4.3,1.8-1.7Zm-6.1-9.5A5.2,5.2,0,0,1,30,21.8,5.2,5.2,0,0,1,24.8,27a5.3,5.3,0,0,1-5.2-5.2A5.2,5.2,0,0,1,24.8,16.6Z" />
    </svg>
  );
};

IconFileBrowser.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconFileBrowser;
