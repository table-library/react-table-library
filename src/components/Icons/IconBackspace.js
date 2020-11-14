import React from 'react';
import PropTypes from 'prop-types';

const IconBackspace = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-backspace"
      data-name="svg-icon-backspace"
      data-testid="svg-icon-backspace"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <g>
        <path d="M12.4,29,1.4,18l11-11H35V29Zm14.2-2.9a2.5,2.5,0,0,0,1.8.8,2.3,2.3,0,0,0,1.7-.8,2.3,2.3,0,0,0,.8-1.7,2.5,2.5,0,0,0-.8-1.8L25.5,18l4.6-4.6a2.5,2.5,0,0,0,.8-1.8,2.3,2.3,0,0,0-.8-1.7,2.3,2.3,0,0,0-1.7-.8,2.5,2.5,0,0,0-1.8.8L22,14.5,17.4,9.9a2.5,2.5,0,0,0-1.8-.8,2.3,2.3,0,0,0-1.7.8,2.3,2.3,0,0,0-.8,1.7,2.5,2.5,0,0,0,.8,1.8L18.5,18l-4.6,4.6a2.5,2.5,0,0,0-.8,1.8,2.3,2.3,0,0,0,.8,1.7,2.3,2.3,0,0,0,1.7.8,2.5,2.5,0,0,0,1.8-.8L22,21.5Z" />
        <path d="M34,8V28H12.8L2.8,18l10-10H34M22,13.1,18.1,9.2a3.3,3.3,0,0,0-2.5-1.1,3.2,3.2,0,0,0-2.4,1.1,3.2,3.2,0,0,0-1.1,2.4,3.4,3.4,0,0,0,1.1,2.5L17.1,18l-3.9,3.9a3.4,3.4,0,0,0-1.1,2.5,3.2,3.2,0,0,0,1.1,2.4,3.2,3.2,0,0,0,2.4,1.1,3.3,3.3,0,0,0,2.5-1.1L22,22.9l3.9,3.9a3.3,3.3,0,0,0,2.5,1.1,3.2,3.2,0,0,0,2.4-1.1,3.2,3.2,0,0,0,1.1-2.4,3.4,3.4,0,0,0-1.1-2.5L26.9,18l3.9-3.9a3.4,3.4,0,0,0,1.1-2.5,3.2,3.2,0,0,0-1.1-2.4,3.2,3.2,0,0,0-2.4-1.1,3.3,3.3,0,0,0-2.5,1.1L22,13.1M36,6H12L0,18,12,30H36V6ZM22,15.9l5.3-5.3a1.4,1.4,0,0,1,2.1,0,1.4,1.4,0,0,1,0,2.1L24.1,18l5.3,5.3a1.4,1.4,0,0,1,0,2.1,1.4,1.4,0,0,1-1,.5,1.6,1.6,0,0,1-1.1-.5L22,20.1l-5.3,5.3a1.6,1.6,0,0,1-1.1.5,1.6,1.6,0,0,1-1-.5,1.4,1.4,0,0,1,0-2.1L19.9,18l-5.3-5.3a1.4,1.4,0,0,1,0-2.1,1.6,1.6,0,0,1,1-.5,1.6,1.6,0,0,1,1.1.5L22,15.9Z" />
      </g>
    </svg>
  );
};

IconBackspace.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconBackspace;
