import React from 'react';
import PropTypes from 'prop-types';

const IconDelete = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-delete"
      data-name="svg-icon-delete"
      data-testid="svg-icon-delete"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M7.6,9.7H28.4V7.8a1.1,1.1,0,0,0-1-1H24.7a1.1,1.1,0,0,1-.8-.3L22.4,4.8a.8.8,0,0,0-.7-.3H14.3a.7.7,0,0,0-.7.4L12.1,6.7a.9.9,0,0,1-.8.4H8.6a1,1,0,0,0-1,1Z" />
      <path d="M8.7,11.8V30.4a2,2,0,0,0,2,2.1H25.3a2,2,0,0,0,2-2.1V11.8Zm5.2,17.6H11.8V14.9h2.1Zm5.1,0H17V14.9h2Zm5.2,0H22.1V14.9h2.1Z" />
    </svg>
  );
};

IconDelete.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default IconDelete;
