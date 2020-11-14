import React from 'react';
import PropTypes from 'prop-types';

const IconDownload = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-download"
      data-name="svg-icon-download"
      data-testid="svg-icon-download"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="24 18 18 28.3 12 18 16 18 16 0 20 0 20 18 24 18" />
      <path d="M33.5,36H2.5A2.5,2.5,0,0,1,0,33.5V23H3V33H33V23h3V33.5A2.5,2.5,0,0,1,33.5,36Z" />
    </svg>
  );
};

IconDownload.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconDownload;
