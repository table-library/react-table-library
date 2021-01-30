import * as React from 'react';
import PropTypes from 'prop-types';

const IconChecked = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-checked"
      data-name="svg-icon-checked"
      data-testid="svg-icon-checked"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="15.7 36 1.9 20.4 4.9 17.7 15 29.1 31.6 0.1 35.1 2 15.7 36" />
    </svg>
  );
};

IconChecked.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconChecked;
