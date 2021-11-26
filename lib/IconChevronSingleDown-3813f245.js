import{p as n,o as e,_ as t}from"./Cell-9d1ebdcf.js";import i from"styled-components";import*as r from"react";var o=function(n){var e=n.margin;return"\n  display: flex;\n  align-items: center;\n\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n\n  width: 100%;\n  height: 100%;\n\n  &.narrow {\n    width: auto;\n  }\n\n  &.active {\n    font-weight: bold;\n  }\n\n  span {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  &.prefix span {\n    margin-right: ".concat(e,";\n  }\n\n  &.suffix span {\n    margin-left: ").concat(e,";\n  }\n\n  div {\n    text-align: left;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n\n  div:after {\n    display: block;\n    content: attr(title);\n    font-weight: bold;\n    height: 0;\n    overflow: hidden;\n    visibility: hidden;\n  }\n")},s=i("button").withConfig({displayName:"Button___StyledButton",componentId:"sc-6dxb5-0"})(["",""],(function(n){return n._css})),a=r.forwardRef((function(n,i){var a=n.margin,d=e(n,["margin"]);return r.createElement(s,t({type:"button",ref:i},d,{_css:o({margin:a})}))}));a.propTypes={margin:n.string};var d=function(n){var e=n.width,t=n.height,i=n.viewBox,o=n.strokeWidth,s=n.style;return r.createElement("svg",{id:"svg-icon-chevron-single-down","data-name":"svg-icon-chevron-single-down","data-testid":"svg-icon-chevron-single-down",xmlns:"http://www.w3.org/2000/svg",width:e||"36rem",height:t||"36rem",viewBox:i||"0 0 36 36",strokeWidth:o||"0rem",style:s||null},r.createElement("polygon",{points:"0 15 0 12 18 21 36 12 36 15 18 24 0 15"}))};d.propTypes={height:n.oneOfType([n.string,n.number]),strokeWidth:n.oneOfType([n.string,n.number]),style:n.objectOf(n.string),viewBox:n.string,width:n.oneOfType([n.string,n.number])};export{a as B,d as I};
//# sourceMappingURL=IconChevronSingleDown-3813f245.js.map