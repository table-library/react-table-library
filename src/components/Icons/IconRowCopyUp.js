import React from 'react';
import PropTypes from 'prop-types';

const IconRowCopyUp = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-copy-up"
      data-name="svg-icon-row-copy-up"
      data-testid="svg-icon-row-copy-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="5 22 0 22 0 9 29 9 29 15.5 27 15.5 27 11 2 11 2 20 5 20 5 22" />
      <polygon points="22 21 18.5 21 18.5 32.5 15.5 32.5 15.5 21 12 21 17 12.5 22 21" />
      <polygon points="14 27.5 8 27.5 8 18.5 11.7 18.5 12.9 16.5 6 16.5 6 29.5 14 29.5 14 27.5" />
      <polygon points="21.1 16.5 22.3 18.5 34 18.5 34 27.5 20 27.5 20 29.5 36 29.5 36 16.5 21.1 16.5" />
    </svg>
  );
};

IconRowCopyUp.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowCopyUp;
