import React from 'react';
import PropTypes from 'prop-types';

const IconPlay = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-play"
      data-name="svg-icon-play"
      data-testid="svg-icon-play"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M9.3,28,26.7,18,9.3,8Z" />
    </svg>
  );
};

IconPlay.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconPlay;
