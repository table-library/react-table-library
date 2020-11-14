import React from 'react';
import PropTypes from 'prop-types';

const IconRowCopyDown = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-copy-down"
      data-name="svg-icon-row-copy-down"
      data-testid="svg-icon-row-copy-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="36 30.5 7 30.5 7 24 9 24 9 28.5 34 28.5 34 19.5 31 19.5 31 17.5 36 17.5 36 30.5" />
      <polygon points="14 18.5 17.5 18.5 17.5 7 20.5 7 20.5 18.5 24 18.5 19 27 14 18.5" />
      <polygon points="22 12 28 12 28 21 24.3 21 23.1 23 30 23 30 10 22 10 22 12" />
      <polygon points="14.9 23 13.7 21 2 21 2 12 16 12 16 10 0 10 0 23 14.9 23" />
    </svg>
  );
};

IconRowCopyDown.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowCopyDown;
