import React from 'react';
import PropTypes from 'prop-types';

const IconCockpit = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-cockpit"
      data-name="svg-icon-cockpit"
      data-testid="svg-icon-cockpit"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect width="10" height="10" rx="0.7" />
      <rect x="26" width="10" height="10" rx="0.7" />
      <rect x="13" width="10" height="10" rx="0.7" />
      <rect y="13" width="10" height="10" rx="0.7" />
      <rect x="26" y="13" width="10" height="10" rx="0.7" />
      <rect x="13" y="13" width="10" height="10" rx="0.7" />
      <rect y="26" width="10" height="10" rx="0.7" />
      <rect x="26" y="26" width="10" height="10" rx="0.7" />
      <rect x="13" y="26" width="10" height="10" rx="0.7" />
    </svg>
  );
};

IconCockpit.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconCockpit;
