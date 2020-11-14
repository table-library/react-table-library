import React from 'react';
import PropTypes from 'prop-types';

const IconExternalControl = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-external-control"
      data-name="svg-icon-external-control"
      data-testid="svg-icon-external-control"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <rect x="13.9" width="1" height="3.6" />
      <rect x="15.7" width="1" height="3.6" />
      <rect x="17.5" width="1" height="3.6" />
      <rect x="19.3" width="1" height="3.6" />
      <rect x="21.1" width="1" height="3.6" />
      <polygon points="25.7 10.3 25.7 18.1 22.9 29.3 20.3 29.3 20.3 36 15.7 36 15.7 29.3 13.1 29.3 10.3 18 10.3 10.3 12.1 10.3 12.1 0 13.1 0 13.1 10.3 16.7 10.3 16.7 17.5 19.3 17.5 19.3 10.3 22.9 10.3 22.9 0 23.9 0 23.9 10.3 25.7 10.3" />
    </svg>
  );
};

IconExternalControl.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconExternalControl;
