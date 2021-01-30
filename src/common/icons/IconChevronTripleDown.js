import * as React from 'react';
import PropTypes from 'prop-types';

const IconChevronTripleDown = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-chevron-triple-down"
      data-name="svg-icon-chevron-triple-down"
      data-testid="svg-icon-chevron-triple-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="0 15 0 12 18 21 36 12 36 15 18 24 0 15" />
      <polygon points="0 6 0 3 18 12 36 3 36 6 18 15 0 6" />
      <polygon points="0 24 0 21 18 30 36 21 36 24 18 33 0 24" />
    </svg>
  );
};

IconChevronTripleDown.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconChevronTripleDown;
