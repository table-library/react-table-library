import React from 'react';
import PropTypes from 'prop-types';

const IconNetwork = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-network"
      data-name="svg-icon-network"
      data-testid="svg-icon-network"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M17,0H1A.9.9,0,0,0,0,1V13a.9.9,0,0,0,1,1H8v1H4a1.1,1.1,0,0,0-1,1v2H15V16a1.1,1.1,0,0,0-1-1H10V14h7a.9.9,0,0,0,1-1V1A.9.9,0,0,0,17,0ZM16,12H2V2H16Z" />
      <path d="M35,18H19a.9.9,0,0,0-1,1V31a1,1,0,0,0,1,1h7v1H22a1.1,1.1,0,0,0-1,1v2H33V34a1.1,1.1,0,0,0-1-1H28V32h7a1.1,1.1,0,0,0,1-1V19A1,1,0,0,0,35,18ZM34,30H20V20H34Z" />
      <path d="M16,32H5.5A2.5,2.5,0,0,1,3,29.5V20H6v9H16Z" />
    </svg>
  );
};

IconNetwork.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconNetwork;
