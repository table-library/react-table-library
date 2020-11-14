import React from 'react';
import PropTypes from 'prop-types';

const IconEllipsis = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-ellipsis"
      data-name="svg-icon-ellipsis"
      data-testid="svg-icon-ellipsis"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <circle cx="5" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="31" cy="18" r="3" />
    </svg>
  );
};

IconEllipsis.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconEllipsis;
