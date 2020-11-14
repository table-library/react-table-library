import React from 'react';
import PropTypes from 'prop-types';

const IconProgramProperties = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-program-properties"
      data-name="svg-icon-program-properties"
      data-testid="svg-icon-program-properties"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M25.1,18.3v-.8a.9.9,0,0,0-.8-.8H11.7a.9.9,0,0,0-.8.8v1.1a.9.9,0,0,0,.8.8H22A8.2,8.2,0,0,1,25.1,18.3Z" />
      <path d="M18.8,22.5h-7a.9.9,0,0,0-.9.9v.9a.9.9,0,0,0,.9.9h6A7.9,7.9,0,0,1,18.8,22.5Z" />
      <path d="M17.6,28.3H3.8V7.8h24V18.3a6.1,6.1,0,0,1,1.8.5V4.3a1.8,1.8,0,0,0-1.8-1.8H3.8A1.8,1.8,0,0,0,2,4.3v24a1.8,1.8,0,0,0,1.8,1.8H18.1A12.1,12.1,0,0,1,17.6,28.3Z" />
      <path d="M33.7,26.8l-1.3-.5c-.2-.5-.3-1.1-.5-1.6l.9-1.1c.2-.1.2-.3.1-.5l-.5-.7c-.1-.1-.2-.3-.4-.2h-.1l-1.4.5a7.1,7.1,0,0,0-1.4-1V20.3c0-.2-.1-.3-.3-.4l-.9-.3a.4.4,0,0,0-.4.2h0l-.8,1.2h-.4a2.5,2.5,0,0,0-1.2.1l-1-1.2c-.1-.1-.2-.2-.4-.1l-.9.3a.8.8,0,0,0-.2.5l.3,1.6-1.1,1-1.6-.3h-.4v.2l-.4.7c-.1.2-.1.4.1.5l1.3,1.1a7.1,7.1,0,0,0-.1,1.4l-1.6.8a.8.8,0,0,0-.2.5l.3.9c0,.2.2.3.4.3h1.7a5,5,0,0,0,.8,1.2l-.6,1.6a.4.4,0,0,0,.2.5l.7.5a.3.3,0,0,0,.5,0l1.2-1,1.5.5.5,1.4a.5.5,0,0,0,.5.3h.8l.5-.3.2-1.5a6.9,6.9,0,0,0,1.5-.7l1.3.7c.2.1.4.1.5-.1L32,32c.2-.1.2-.3.1-.5h0l-.7-1.3a5.2,5.2,0,0,0,.7-1.5l1.4-.2c.2,0,.4-.1.4-.3v-.9a.5.5,0,0,0-.3-.5Zm-7.3-3.6a3.8,3.8,0,1,1-3.6,4h0a3.7,3.7,0,0,1,3.5-3.9Z" />
      <rect x="10.9" y="10.9" width="14.2" height="2.67" rx="1" />
      <rect x="6.4" y="10.9" width="2.7" height="2.67" rx="1" />
      <rect x="6.5" y="16.7" width="2.7" height="2.67" rx="1" />
      <rect x="6.5" y="22.5" width="2.7" height="2.67" rx="1" />
    </svg>
  );
};

IconProgramProperties.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconProgramProperties;
