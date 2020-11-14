import React from 'react';
import PropTypes from 'prop-types';

const IconMaintenance = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-maintenance"
      data-name="svg-icon-maintenance"
      data-testid="svg-icon-maintenance"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path
        d="M23.4,18.1h5a0,0,0,0,1,0,0v17a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1v-17a0,0,0,0,1,0,0Z"
        transform="translate(-11.6 26.2) rotate(-45)"
      />
      <path d="M14.2,17.5,6.4,9.7H6.3l-1.1.6a.4.4,0,0,1-.4-.2L.8,4.2c0-.1,0-.1.1-.2l2-2H3L9,6c.1.1.2.2.1.4L8.5,7.5h.1l7.8,7.8" />
      <path d="M35,6.3,32.3,9a1.6,1.6,0,0,1-1.2.5l-3.3-.6a1.2,1.2,0,0,1-.7-.7l-.6-3.3A1.6,1.6,0,0,1,27,3.7l2.3-2.3c.1-.1.1-.2,0-.2a5.9,5.9,0,0,0-5.1,1.7,6.7,6.7,0,0,0-1.8,6.6,1.1,1.1,0,0,1-.3,1.1L1.5,31.2a1.1,1.1,0,0,0-.1,1.4l2,2a1.1,1.1,0,0,0,1.4-.1C8.3,31,22.7,16.7,25.4,13.9a1.1,1.1,0,0,1,1.1-.3,6.7,6.7,0,0,0,6.6-1.8,7.1,7.1,0,0,0,2.1-5.4Z" />
    </svg>
  );
};

IconMaintenance.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconMaintenance;
