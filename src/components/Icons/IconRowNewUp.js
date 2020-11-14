import React from 'react';
import PropTypes from 'prop-types';

const IconRowNewUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-new-up"
      data-name="svg-icon-row-new-up"
      data-testid="svg-icon-row-new-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="24 14 24 17 19.5 17 19.5 21.5 16.5 21.5 16.5 17 12 17 12 14 16.5 14 16.5 9.5 19.5 9.5 19.5 14 24 14" />
      <polygon points="36 27.5 0 27.5 0 14.5 10 14.5 10 16.5 2 16.5 2 25.5 34 25.5 34 16.5 26 16.5 26 14.5 36 14.5 36 27.5" />
    </svg>
  );
};

IconRowNewUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowNewUp;
