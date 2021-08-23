import useDoubleClickBase from 'use-double-click';

const NOOP = () => {};

export const useDoubleClick = (ref, onClick, onDoubleClick, node) =>
  useDoubleClickBase({
    onSingleClick: onClick ? (event) => onClick(node, event) : NOOP,
    onDoubleClick: onDoubleClick
      ? (event) => onDoubleClick(node, event)
      : NOOP,
    latency: onDoubleClick ? 250 : 0,
    ref,
  });
