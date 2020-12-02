import useDoubleClickBase from 'use-double-click';

const NOOP = () => {};

export const useDoubleClick = (ref, onClick, onDoubleClick, item) =>
  useDoubleClickBase({
    onSingleClick: onClick || NOOP,
    onDoubleClick: onDoubleClick
      ? event => onDoubleClick(event, item)
      : NOOP,
    latency: onDoubleClick ? 250 : 0,
    ref
  });
