import React from 'react';
import PropTypes from 'prop-types';

const IconUserAdmin = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-user-admin"
      data-name="svg-icon-user-admin"
      data-testid="svg-icon-user-admin"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M19.1,31.7l.5-1.1-.5-.8H17.8a1.7,1.7,0,0,1-1.5-1.3l-.2-1a1.5,1.5,0,0,1,.8-1.7l1.3-.6c0-.2.1-.5.1-.7l-1.1-1a1.5,1.5,0,0,1-.3-1.9l.5-.9a1.5,1.5,0,0,1,1.6-.8l1.5.4.5-.5-.2-1.5a1.6,1.6,0,0,1,1-1.6l1-.4a1.7,1.7,0,0,1,1.8.5l.8,1.1h.5a22.8,22.8,0,0,0,.5-5.7c0-4-.9-9.2-8.4-9.2S9.6,8.2,9.6,12.2s0,7.8,3.7,10v.3C7.8,24.1,4,27.9,4,32.1V33H19.1A1.5,1.5,0,0,1,19.1,31.7Z" />
      <path d="M35.1,26l-1.8-.7a5.3,5.3,0,0,0-.4-1.8l1.3-1.4a.5.5,0,0,0,.1-.6l-.6-1a.5.5,0,0,0-.6-.2l-1.9.6a5.8,5.8,0,0,0-1.5-1.1l.2-1.9c0-.2-.2-.5-.4-.5L28.4,17a.7.7,0,0,0-.6.2l-1,1.7H25l-1.2-1.6a.7.7,0,0,0-.6-.2l-1.1.5c-.2,0-.3.3-.3.5l.3,2a4.6,4.6,0,0,0-1.2,1.2l-2.1-.5a.5.5,0,0,0-.5.3l-.6.9a.5.5,0,0,0,.2.6l1.5,1.4a5.5,5.5,0,0,0-.2,1.8l-1.9.8a.5.5,0,0,0-.2.6l.2,1.1c0,.2.3.4.5.4h2a5.6,5.6,0,0,0,.9,1.7L20,32.1a.6.6,0,0,0,.2.7l.8.6a.5.5,0,0,0,.7,0l1.4-1.1a4.8,4.8,0,0,0,2,.7l.4,1.6a.5.5,0,0,0,.6.4h1.1a.4.4,0,0,0,.4-.4l.4-1.7,1.9-.8,1.5.9a.6.6,0,0,0,.6,0l.9-.8a.6.6,0,0,0,.1-.6L32.1,30a5.1,5.1,0,0,0,.9-1.8h1.8c.3-.1.5-.2.5-.5v-1A.5.5,0,0,0,35.1,26Zm-8.9,4a4,4,0,1,1,4.1-4A4,4,0,0,1,26.2,30Z" />
    </svg>
  );
};

IconUserAdmin.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconUserAdmin;
//
