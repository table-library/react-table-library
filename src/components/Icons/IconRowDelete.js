import React from 'react';
import PropTypes from 'prop-types';

const IconRowDelete = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-row-delete"
      data-name="svg-icon-row-delete"
      data-testid="svg-icon-row-delete"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="20.1 18 24.7 22.6 22.6 24.7 18 20.1 13.4 24.7 11.3 22.6 15.9 18 11.3 13.4 13.4 11.3 18 15.9 22.6 11.3 24.7 13.4 20.1 18" />
      <polygon points="10 22.5 2 22.5 2 13.5 10 13.5 10 11.5 0 11.5 0 24.5 10 24.5 10 22.5" />
      <polygon points="26 11.5 26 13.5 34 13.5 34 22.5 26 22.5 26 24.5 36 24.5 36 11.5 26 11.5" />
    </svg>
  );
};

IconRowDelete.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconRowDelete;
