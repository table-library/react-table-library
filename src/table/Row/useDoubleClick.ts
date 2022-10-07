import * as React from 'react';

import { TableNode, OnClick, Event } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';

const NOOP = () => {};

const useDoubleClickBase = ({
  onSingleClick,
  onDoubleClick,
  ref,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  onSingleClick: (e: Event) => void;
  onDoubleClick: ((e: Event) => void) | null;
}) => {
  React.useEffect(() => {
    const { current } = ref;

    let clickCount = 0;

    const handleDoubleClick = (event: any) => {
      if (onDoubleClick) {
        if (clickCount === 0) {
          onSingleClick(event);
        }

        clickCount += 1;

        setTimeout(() => {
          if (clickCount === 2) onDoubleClick(event);

          clickCount = 0;
        }, 300);
      }
    };

    current?.addEventListener('click', handleDoubleClick);

    return () => {
      current?.removeEventListener('click', handleDoubleClick);
    };
  });
};

export const useDoubleClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onClick: OnClick | Nullish,
  onDoubleClick: OnClick | Nullish,
  node: TableNode,
) => {
  useDoubleClickBase({
    onSingleClick: onClick ? (event) => onClick(node, event) : NOOP,
    onDoubleClick: onDoubleClick ? (event) => onDoubleClick(node, event) : null,
    ref,
  });
};
