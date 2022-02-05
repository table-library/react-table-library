import useDoubleClickBase from 'use-double-click';

import { TableNode, OnClick } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';

const NOOP = () => {};

export const useDoubleClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onClick: OnClick | Nullish,
  onDoubleClick: OnClick | Nullish,
  node: TableNode,
) =>
  useDoubleClickBase({
    onSingleClick: onClick ? (event) => onClick(node, event) : NOOP,
    onDoubleClick: onDoubleClick ? (event) => onDoubleClick(node, event) : NOOP,
    latency: onDoubleClick ? 250 : 0,
    ref,
  });
