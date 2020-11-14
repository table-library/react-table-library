import React from 'react';
import PropTypes from 'prop-types';

const IconSave = ({ width, height, viewBox, strokeWidth, style }) => {
  return (
    <svg
      id="svg-icon-save"
      data-name="svg-icon-save"
      data-testid="svg-icon-save"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M6,6V26.2L9.6,30H30V6ZM25.3,28.7H10.7v-8H25.3Zm2-10H8.7V8H27.3Z" />
      <rect x="12.7" y="21.5" width="3.6" height="6" />
    </svg>
  );
};

IconSave.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconSave;
