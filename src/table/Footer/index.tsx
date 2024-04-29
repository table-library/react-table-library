import * as React from 'react';

import { Header } from '../Header';
import { HeaderRow } from '../Row';
import { HeaderCell } from '../Cell';

import {
  HeaderProps,
  HeaderRowProps,
  HeaderCellProps,
} from '@overmap-ai/react-table-library/types/table';

const Footer: React.FC<HeaderProps> = (props) => <Header {...props} isFooter />;

const FooterRow: React.FC<HeaderRowProps> = (props) => (
  <HeaderRow {...props} isFooter role="rowfooter" />
);

const FooterCell: React.FC<HeaderCellProps> = (props) => (
  <HeaderCell {...props} isFooter role="columnfooter" />
);

export { Footer, FooterRow, FooterCell };
