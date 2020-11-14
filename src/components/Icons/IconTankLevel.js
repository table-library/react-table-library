import React from 'react';
import PropTypes from 'prop-types';

const IconTankLevel = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-tank-level"
      data-name="svg-icon-tank-level"
      data-testid="svg-icon-tank-level"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon points="22 13.1 18 18.9 14 13.1 16.3 13.1 16.3 4 19.7 4 19.7 13.1 22 13.1" />
      <path d="M30.5,13.9V21l-1.4.8a3.1,3.1,0,0,1-2.5.2l-2.5-1.1a2.8,2.8,0,0,0-2.2,0l-2.8,1.2a2.8,2.8,0,0,1-2.2,0l-2.8-1.2a2.8,2.8,0,0,0-2.2,0L9.4,22a3.1,3.1,0,0,1-2.5-.2L5.5,21V13.9H3v17A2.1,2.1,0,0,0,5.1,33H30.9A2.1,2.1,0,0,0,33,30.9v-17Zm0,16.6H5.5V23.6l1.2.7a2.8,2.8,0,0,0,2.5.1l2.7-1.1a2.8,2.8,0,0,1,2.2,0l2.8,1.2a2.8,2.8,0,0,0,2.2,0l2.8-1.2a2.8,2.8,0,0,1,2.2,0l2.7,1.1a2.8,2.8,0,0,0,2.5-.1l1.2-.7Z" />
    </svg>
  );
};

IconTankLevel.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconTankLevel;
