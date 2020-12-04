import React from 'react';
import PropTypes from 'prop-types';

const IconChevronSingleRight = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-single-right"
      data-name="svg-icon-chevron-single-right"
      data-testid="svg-icon-chevron-single-right"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="15 36 12 36 21 18 12 0 15 0 24 18 15 36" />
    </svg>
  );
};

IconChevronSingleRight.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconChevronSingleRight;
