import React from 'react';
import PropTypes from 'prop-types';

const IconManualOperation = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-manual-operation"
      data-name="svg-icon-manual-operation"
      data-testid="svg-icon-manual-operation"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M33,9.2V25.4C33,31.3,27.5,36,21.9,36a9.9,9.9,0,0,1-9-6L5.3,19.8a1.4,1.4,0,0,1,.2-2,3,3,0,0,1,1.8-.6,2.8,2.8,0,0,1,2.2,1l4.5,6V5a2.1,2.1,0,0,1,1.8-2.1A2,2,0,0,1,18,5V17h1V2.2A2,2,0,0,1,20.8.1,2,2,0,0,1,23,2.2V17h1V5a2.1,2.1,0,0,1,1.8-2.1A2,2,0,0,1,28,5V17h1V9.2a2.1,2.1,0,0,1,1.8-2.1A2,2,0,0,1,33,9.2Z" />
    </svg>
  );
};

IconManualOperation.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconManualOperation;
