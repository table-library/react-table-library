import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronSingleLeft = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-single-left"
      data-name="svg-icon-chevron-single-left"
      data-testid="svg-icon-chevron-single-left"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="21 0 24 0 15 18 24 36 21 36 12 18 21 0" />
    </svg>
  );
};

IconChevronSingleLeft.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconChevronSingleLeft;
