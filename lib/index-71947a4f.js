import{_ as e,p as t,o as n,C as o,H as r,a as c,e as i}from"./Cell-9d1ebdcf.js";import*as l from"react";import{S as s}from"./Select-eec7d496.js";import a from"styled-components";import{s as d,b as u}from"./useSyncControlledState-6116efef.js";import{d as f}from"./defineProperty-38df0e0b.js";import p from"classnames";import{i as m}from"./isRowClick-07f79142.js";import{u as g}from"./useIdReducer-b30a10da.js";var y=a("input").withConfig({displayName:"Checkbox___StyledInput",componentId:"sc-1nqisor-0"})(["",""],(function(e){return e._css})),S=l.forwardRef((function(t,n){return l.createElement(y,e({type:"checkbox",ref:n},t,{_css:"\n  cursor: pointer;\n"}))})),b=function(e){var t=e.checked,n=e.isIndeterminate,o=e.onChange;return l.createElement(S,{ref:function(e){e&&(t?(e.indeterminate=!1,e.checked=!0):n?(e.indeterminate=!0,e.checked=!1):(e.indeterminate=!1,e.checked=!1))},type:"checkbox",onChange:o})};b.propTypes={checked:t.bool,isIndeterminate:t.bool,onChange:t.func};var h={RowClick:"RowClick",ButtonClick:"ButtonClick"},C={SingleSelect:"SingleSelect",MultiSelect:"MultiSelect"},k=l.memo((function(t){var r=t.item;t.children;var c=n(t,["item","children"]),i=l.useContext(s),a=i._options.buttonSelect===C.SingleSelect&&i.state.id===r.id||i.state.ids.includes(r.id);return l.createElement(o,e({shrink:!0},c),l.createElement(b,{select:i,checked:a,onChange:function(){i._options.buttonSelect===C.SingleSelect?i.fns.onToggleByIdExclusively(r.id):i.fns.onToggleByIdRecursively(r.id,{isCarryForward:i._options.isCarryForward})}}))}));k.propTypes={item:t.objectOf(t.any),children:t.oneOfType([t.arrayOf(t.node),t.node,t.func])};var w=l.memo((function(t){t.children;var o=n(t,["children"]),c=l.useContext(s),i=c.state.all,a=!c.state.all&&!c.state.none||c._options.buttonSelect===C.SingleSelect&&null!=c.state.id;return l.createElement(r,e({shrink:!0},o),l.createElement(b,{checked:i,isIndeterminate:a,onChange:function(){return c.fns.onToggleAll()}}))}));function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}w.propTypes={children:t.oneOfType([t.arrayOf(t.node),t.node,t.func])};var v=function(e,t){var n=e.item,o=t.select,r=o.state.ids.includes(n.id),l=o.state.id===n.id;return{theme:"\n    &.row-select-selected,\n    &.row-select-single-selected {\n      color: ".concat(c,";\n      font-weight: bold;\n\n      background-color: ").concat(i,";\n    }\n\n    &.row-select-clickable {\n      cursor: pointer;\n    }\n  "),className:p("row-select",{"row-select-clickable":o._options.clickType===h.RowClick,"row-select-selected":r,"row-select-single-selected":l}),onClick:function(e,t){m(t)&&o._options.clickType===h.RowClick&&(o._options.rowSelect===C.SingleSelect?o.fns.onToggleByIdExclusively(e.id):o.fns.onToggleById(e.id))}}},j={ids:[],id:null},T={clickType:h.RowClick,rowSelect:C.SingleSelect,buttonSelect:C.MultiSelect,isCarryForward:!1},E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3?arguments[3]:void 0,r=t||{},c=_(_({},j),r.state),i=r.onChange||function(){},l=g(e,c,i,o),s=d(l,2),a=s[0],f=s[1];u("select",o,a);var p=_(_({},T),n);return{state:a,fns:f,_options:p,_getRowProps:v}},P=Object.freeze({__proto__:null,CellSelect:k,HeaderCellSelect:w,SELECT_CLICK_TYPES:h,SELECT_TYPES:C,useRowSelect:E,Checkbox:b});export{k as C,w as H,h as S,C as a,b,P as i,E as u};
//# sourceMappingURL=index-71947a4f.js.map