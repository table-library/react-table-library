import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronSingleUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style,
}) => {
  return (
    <svg
      id="svg-icon-chevron-single-up"
      data-name="svg-icon-chevron-single-up"
      data-testid="svg-icon-chevron-single-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 21 36 24 18 15 0 24 0 21 18 12 36 21" />
    </svg>
  );
};

IconChevronSingleUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default IconChevronSingleUp;
