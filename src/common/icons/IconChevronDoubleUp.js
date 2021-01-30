import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronDoubleUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-double-up"
      data-name="svg-icon-chevron-double-up"
      data-testid="svg-icon-chevron-double-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 16.5 36 19.5 18 10.5 0 19.5 0 16.5 18 7.5 36 16.5" />
      <polygon points="36 25.5 36 28.5 18 19.5 0 28.5 0 25.5 18 16.5 36 25.5" />
    </svg>
  );
};

IconChevronDoubleUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconChevronDoubleUp;
