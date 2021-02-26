import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronSingleUpDown = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style,
}) => {
  return (
    <svg
      id="svg-icon-chevron-single-up-down"
      data-name="svg-icon-chevron-single-up-down"
      data-testid="svg-icon-chevron-single-up-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 12 36 15 18 6 0 15 0 12 18 3 36 12" />
      <polygon points="0 24 0 21 18 30 36 21 36 24 18 33 0 24" />
    </svg>
  );
};

IconChevronSingleUpDown.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default IconChevronSingleUpDown;
