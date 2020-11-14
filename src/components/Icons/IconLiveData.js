import React from 'react';
import PropTypes from 'prop-types';

const IconLiveData = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-live-data"
      data-name="svg-icon-live-data"
      data-testid="svg-icon-live-data"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M10.6,34.7,8.7,21H1.5a1.5,1.5,0,0,1,0-3h9.8l1.1,8L19,1.3a1,1,0,0,1,2,0L25.1,16h9.4a1.5,1.5,0,0,1,0,3H22.9L20.1,9.1,13.2,34.9A1.3,1.3,0,0,1,10.6,34.7Z" />
    </svg>
  );
};

IconLiveData.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconLiveData;
