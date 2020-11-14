import React from 'react';
import PropTypes from 'prop-types';

const IconRowUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-up"
      data-name="svg-icon-row-up"
      data-testid="svg-icon-row-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 29.5 0 29.5 0 16.5 14 16.5 14 18.5 2 18.5 2 27.5 34 27.5 34 18.5 22 18.5 22 16.5 36 16.5 36 29.5" />
      <polygon points="23 12 19.5 12 19.5 23.5 16.5 23.5 16.5 12 13 12 18 3.5 23 12" />
    </svg>
  );
};

IconRowUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowUp;
