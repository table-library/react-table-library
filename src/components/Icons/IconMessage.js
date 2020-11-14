import React from 'react';
import PropTypes from 'prop-types';

const IconMessage = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-message"
      data-name="svg-icon-message"
      data-testid="svg-icon-message"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M36,8.5V7a.9.9,0,0,0-1-1H1A.9.9,0,0,0,0,7V8.5L16.9,20.3a1.8,1.8,0,0,0,2.2,0Z" />
      <polygon points="11.3 18.3 0 10.3 0 26.2 11.3 18.3" />
      <path d="M23.4,19.2l-4.3,2.9a1.8,1.8,0,0,1-2.2,0l-4.3-2.9L0,28v1a.9.9,0,0,0,1,1H35a.9.9,0,0,0,1-1V28Z" />
      <polygon points="36 10.3 24.7 18.3 36 26.2 36 10.3" />
    </svg>
  );
};

IconMessage.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconMessage;
