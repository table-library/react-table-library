import React from 'react';
import PropTypes from 'prop-types';

const IconNote = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-note"
      data-name="svg-icon-note"
      data-testid="svg-icon-note"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <g>
        <polygon points="30.7 30.5 30.7 21.5 21.7 30.5 30.7 30.5" />
        <path d="M5.3,5.5v25H21.7v-9h9V5.5ZM22.9,16.9H8.7V15.1H22.9Zm4.4-5.2H8.7V9.9H27.3Z" />
      </g>
    </svg>
  );
};

IconNote.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconNote;
