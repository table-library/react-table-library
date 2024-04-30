import * as React from 'react';

import {
  Footer,
  FooterRow,
  FooterCell,
  TableNode,
} from '@overmap-ai/react-table-library/table/index';

import { Column } from '@overmap-ai/react-table-library/types/compact';

type FooterProps<T extends TableNode> = { columns: Column<T>[] };

export const CompactFooter = <T extends TableNode>({ columns }: FooterProps<T>) => {
  return (
    <Footer>
      <FooterRow>
        {columns.map((column: Column<T>, index: number) => (
          <FooterCell key={index}>{column.footer}</FooterCell>
        ))}
      </FooterRow>
    </Footer>
  );
};
