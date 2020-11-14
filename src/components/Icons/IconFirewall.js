import React from 'react';
import PropTypes from 'prop-types';

const IconFirewall = ({
  width,
  height,
  viewBox,
  strokeWidth,
  style
}) => {
  return (
    <svg
      id="svg-icon-firewall"
      data-name="svg-icon-firewall"
      data-testid="svg-icon-firewall"
      xmlns="http://www.w3.org/2000/svg"
      width={width || '36rem'}
      height={height || '36rem'}
      viewBox={viewBox || '0 0 36 36'}
      strokeWidth={strokeWidth || '0rem'}
      style={style || null}
    >
      <path d="M34.4,3.8,18.4.5h-.8L1.6,3.8A2.1,2.1,0,0,0,0,5.8v16c0,5.6,14.7,12.3,17.6,13.6h.8c2.9-1.3,17.6-8,17.6-13.6V5.8A2.1,2.1,0,0,0,34.4,3.8ZM10.5,4,18,2.5,25.5,4V7.2h-15ZM2,5.8,9.5,4.2v3H2ZM2,8.2H17.5v4H2Zm23.5,5v4h-15v-4ZM2,13.2H9.5v4H2Zm0,9v-4H17.5v4Zm23.5,1v4h-15v-4Zm-23,0h7v4H6.8A15.4,15.4,0,0,1,2.5,23.2Zm5.8,5h9.2v4.9A68.5,68.5,0,0,1,8.3,28.2Zm10.2,4.9V28.2h9.2A68.5,68.5,0,0,1,18.5,33.1Zm10.7-5.9H26.5v-4h7A15.4,15.4,0,0,1,29.2,27.2ZM34,21.8v.4H18.5v-4H34Zm0-4.6H26.5v-4H34Zm0-5H18.5v-4H34Zm0-5H26.5v-3L34,5.8h0Z" />
    </svg>
  );
};

IconFirewall.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.objectOf(PropTypes.string),
  viewBox: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default IconFirewall;
