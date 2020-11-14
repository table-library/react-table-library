import React from 'react';
import PropTypes from 'prop-types';

const IconLaserOn = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-laser-on"
      data-name="svg-icon-laser-on"
      data-testid="svg-icon-laser-on"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <polygon
        points="35.8 36 0.2 36 18 0.4 35.8 36"
        fill="#f6bd16"
      />
      <path d="M27.5,24a.5.5,0,0,1-.5.5H21v.2l2.8,1.1a.5.5,0,0,1,.3.7.5.5,0,0,1-.5.3h-.2l-2.8-1.2h0L24.7,30a.5.5,0,0,1,0,.7l-.3.2a.5.5,0,0,1-.4-.2l-4.3-4.2h-.1l1.2,2.8a.6.6,0,0,1-.3.7h-.2a.5.5,0,0,1-.5-.3l-1.1-2.8h-.2v6a.5.5,0,0,1-1,0V27h-.2l-1.1,2.8a.5.5,0,0,1-.5.3h-.2a.6.6,0,0,1-.3-.7l1.2-2.8h-.1L12,30.7a.5.5,0,0,1-.4.2l-.3-.2a.5.5,0,0,1,0-.7l4.2-4.3h0l-2.8,1.2h-.2a.5.5,0,0,1-.5-.3.5.5,0,0,1,.3-.7l2.8-1.1v-.2H5.9l.5-1H15v-.2l-2.8-1.1a.5.5,0,0,1-.3-.7.6.6,0,0,1,.7-.3l2.8,1.2h0L11.3,18a.5.5,0,1,1,.7-.7l4.3,4.2h.1l-1.2-2.9c-.1-.2.1-.5.3-.6a.5.5,0,0,1,.7.3l1.1,2.8h.2V15a.5.5,0,0,1,1,0v6h.2l1.1-2.8a.5.5,0,0,1,.7-.3c.2.1.4.4.3.6l-1.2,2.9h.1L24,17.3a.5.5,0,1,1,.7.7l-4.2,4.3h0l2.8-1.2a.6.6,0,0,1,.7.3.5.5,0,0,1-.3.7l-2.8,1.1v.2h6A.5.5,0,0,1,27.5,24Z" />
    </svg>
  );
};

IconLaserOn.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconLaserOn;
