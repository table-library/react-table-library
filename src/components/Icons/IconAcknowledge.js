import React from 'react';
import PropTypes from 'prop-types';

const IconAcknowledge = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-acknowledge"
      data-name="svg-icon-acknowledge"
      data-testid="svg-icon-acknowledge"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M30.1,11.7l4.4,6.9c3.1,5,.9,11.9-3.8,14.9a10,10,0,0,1-10.8-.3L8,28.5a1.4,1.4,0,0,1-.9-1.7,3.3,3.3,0,0,1,1.2-1.6,2.8,2.8,0,0,1,2.4-.2l7,2.7L7.5,11.4A2.2,2.2,0,0,1,8,8.6a2,2,0,0,1,2.9.7l6.4,10.1.8-.5-.9-1.5a2,2,0,0,1,.4-2.8,2,2,0,0,1,2.9.7l1,1.5.9-.5-.6-.9a2,2,0,0,1,.5-2.7,1.9,1.9,0,0,1,2.9.6l.6.8.8-.5v.2a2,2,0,0,1,.5-2.7A1.9,1.9,0,0,1,30.1,11.7Z" />
      <path d="M10.4,17.9l-3.7-6a3,3,0,0,1,.7-4.1,2.7,2.7,0,0,1,1.7-.6,3.3,3.3,0,0,1,2.7,1.5l3.7,6A8.2,8.2,0,0,0,17,10a8,8,0,1,0-8,8Z" />
    </svg>
  );
};

IconAcknowledge.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconAcknowledge;
