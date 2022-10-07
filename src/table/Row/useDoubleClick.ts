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
  const clickCount = React.useRef(0);

  React.useEffect(() => {
    const { current } = ref;

    const handleDoubleClick = (event: any) => {
      if (onDoubleClick) {
        if (clickCount.current === 0) {
          onSingleClick(event);
        }

        clickCount.current += 1;

        setTimeout(() => {
          if (clickCount.current === 2) onDoubleClick(event);

          clickCount.current = 0;
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
