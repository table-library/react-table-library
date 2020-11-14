import React from 'react';
import PropTypes from 'prop-types';

const IconMessageOverview = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-message-overview"
      data-name="svg-icon-message-overview"
      data-testid="svg-icon-message-overview"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M28.5,6.8V8L15.2,17.3a1.7,1.7,0,0,1-1.9,0L0,8V6.8A.9.9,0,0,1,.8,6H27.7A.9.9,0,0,1,28.5,6.8Z" />
      <polygon points="9 15.7 0 22 0 9.4 9 15.7" />
      <rect x="21.8" y="18.3" width="14.3" height="2" />
      <path d="M20.8,18h0l-2.3-1.6-3.3,2.4a2.1,2.1,0,0,1-1.9,0L10,16.4l-10,7v.8a.9.9,0,0,0,.8.8h20Z" />
      <polygon points="28.5 17.3 28.5 9.4 19.5 15.7 21.7 17.3 28.5 17.3" />
      <rect x="21.7" y="22.1" width="14.3" height="2" />
      <rect x="21.7" y="26.1" width="14.3" height="2" />
      <rect x="21.7" y="30.1" width="14.3" height="2" />
    </svg>
  );
};

IconMessageOverview.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconMessageOverview;
