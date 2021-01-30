import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronSingleDown = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-single-down"
      data-name="svg-icon-chevron-single-down"
      data-testid="svg-icon-chevron-single-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="0 15 0 12 18 21 36 12 36 15 18 24 0 15" />
    </svg>
  );
};

IconChevronSingleDown.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconChevronSingleDown;
