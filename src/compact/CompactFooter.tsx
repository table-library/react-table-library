import * as React from 'react';

import { Footer, FooterRow, FooterCell } from '@table-library/react-table-library/table/index';

import { Column } from '@table-library/react-table-library/types/compact';

type FooterProps = { columns: Column[] };

export const CompactFooter: React.FC<FooterProps> = ({ columns }: FooterProps) => {
  return (
    <Footer>
      <FooterRow>
        {columns.map((column: Column, index: number) => (
          <FooterCell key={index}>{column.footer}</FooterCell>
        ))}
      </FooterRow>
    </Footer>
  );
};
