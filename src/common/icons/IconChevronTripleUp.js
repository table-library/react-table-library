import React from 'react';
import PropTypes from 'prop-types';

const IconChevronTripleUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-triple-up"
      data-name="svg-icon-chevron-triple-up"
      data-testid="svg-icon-chevron-triple-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 12 36 15 18 6 0 15 0 12 18 3 36 12" />
      <polygon points="36 30 36 33 18 24 0 33 0 30 18 21 36 30" />
      <polygon points="36 21 36 24 18 15 0 24 0 21 18 12 36 21" />
    </svg>
  );
};

IconChevronTripleUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconChevronTripleUp;
