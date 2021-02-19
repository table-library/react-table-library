import useDoubleClickBase from 'use-double-click';

const NOOP = () => {};

export const useDoubleClick = (
  ref,
  onClick,
  onDoubleClick,
  tableItem
) =>
  useDoubleClickBase({
    onSingleClick: onClick
      ? event => onClick(tableItem, event)
      : NOOP,
    onDoubleClick: onDoubleClick
      ? event => onDoubleClick(tableItem, event)
      : NOOP,
    latency: onDoubleClick ? 250 : 0,
    ref
  });
