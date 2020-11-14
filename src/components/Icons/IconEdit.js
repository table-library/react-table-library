import React from 'react';
import PropTypes from 'prop-types';

const IconEdit = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-edit"
      data-name="svg-icon-edit"
      data-testid="svg-icon-edit"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <g>
        <polygon points="33 6.7 30.3 9.4 26.6 5.7 29.3 3 33 6.7" />
        <polygon points="29.3 10.5 11.7 28 7.9 24.3 25.5 6.7 29.3 10.5" />
        <polygon points="10.8 29.2 10.2 29.8 9.9 29.5 9.7 29.3 6.7 26.3 6.5 26.1 6.2 25.8 6.8 25.2 10.8 29.2" />
        <polygon points="6.2 25.8 10.2 29.8 5.5 31.5 4.1 33 3 31.9 4.4 30.5 6.2 25.8" />
      </g>
    </svg>
  );
};

IconEdit.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconEdit;
