import React from 'react';
import PropTypes from 'prop-types';

const IconSettings = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-settings"
      data-name="svg-icon-settings"
      data-testid="svg-icon-settings"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M35.6,24.3l-2.2-.8a10.2,10.2,0,0,0-.6-2.5l1.5-1.6a.6.6,0,0,0,0-.8l-.8-1.2a.6.6,0,0,0-.7-.2l-2.2.7a11,11,0,0,0-2.1-1.4V14.3a.8.8,0,0,0-.5-.7l-1.4-.4a1.1,1.1,0,0,0-.7.3l-1.2,2h-.3l-2.1.3-1.5-1.9a.8.8,0,0,0-.8-.2l-1.2.6a.6.6,0,0,0-.4.7l.4,2.5a7.5,7.5,0,0,0-1.5,1.6l-2.6-.5a.5.5,0,0,0-.7.3l-.6,1.2a.6.6,0,0,0,.2.8l2.1,1.7a6.2,6.2,0,0,0-.2,1.9v.2L13.2,26a.6.6,0,0,0-.3.7l.3,1.3a.7.7,0,0,0,.6.5h2.7a8.1,8.1,0,0,0,1.2,1.8l-.9,2.4a.6.6,0,0,0,.2.7l1.2.8a.5.5,0,0,0,.7,0l1.9-1.5,2.4.7h0l.7,2.2a.8.8,0,0,0,.6.4H26a.5.5,0,0,0,.5-.5l.4-2.3a8.7,8.7,0,0,0,2.4-1l1.9,1.2a.8.8,0,0,0,.8-.1l1-1a.6.6,0,0,0,.1-.8L32,29.5a16.3,16.3,0,0,0,1.1-2.3l2.2-.3a.6.6,0,0,0,.5-.6l.2-1.4A.7.7,0,0,0,35.6,24.3Zm-11.1,6a5.8,5.8,0,0,1,0-11.6,5.8,5.8,0,0,1,0,11.6Z" />
      <path d="M20.2,10.1l-1.8-.8a17.4,17.4,0,0,0-.5-2.2l1.3-1.4a.6.6,0,0,0,.1-.7l-.7-1a.4.4,0,0,0-.6-.3l-1.9.6a13.3,13.3,0,0,0-1.9-1.4V1c.1-.3-.1-.5-.4-.6L12.7,0a.4.4,0,0,0-.6.3L11,2h-.6a4.4,4.4,0,0,0-1.6.2L7.5.5A.5.5,0,0,0,6.9.3L5.7.7a.8.8,0,0,0-.4.6l.4,2.3A9.3,9.3,0,0,0,4.2,4.9L2,4.4a.4.4,0,0,0-.6.3l-.6,1a.5.5,0,0,0,.1.7L2.7,8a5.8,5.8,0,0,0-.2,1.9l-2.2,1a.7.7,0,0,0-.3.6l.3,1.2a.5.5,0,0,0,.5.5H3.2a8.6,8.6,0,0,0,1,1.6L3.3,17a.7.7,0,0,0,.2.7l1,.7a.5.5,0,0,0,.7,0l1.7-1.3,2,.7.6,2a.7.7,0,0,0,.6.4h1.2a.7.7,0,0,0,.6-.4l.4-2a6.7,6.7,0,0,0,2.1-.9L16.1,18a.6.6,0,0,0,.7-.1l.9-.8a.5.5,0,0,0,.1-.7l-.9-1.8a7.5,7.5,0,0,0,1-2l2-.2a.5.5,0,0,0,.5-.5l.2-1.2A.5.5,0,0,0,20.2,10.1ZM10.4,4.8A5.2,5.2,0,1,1,5.3,10,5.1,5.1,0,0,1,10.4,4.8Z" />
    </svg>
  );
};

IconSettings.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconSettings;
