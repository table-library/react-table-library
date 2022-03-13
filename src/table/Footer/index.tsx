import * as React from 'react';

import { Header } from '../Header';
import { HeaderRow } from '../Row';
import { HeaderCell } from '../Cell';

import {
  HeaderProps,
  HeaderRowProps,
  HeaderCellProps,
} from '@table-library/react-table-library/types/table';

const Footer: React.FC<HeaderProps> = (props) => <Header {...props} _className="tfoot" />;

const FooterRow: React.FC<HeaderRowProps> = (props) => (
  <HeaderRow {...props} _className="tr-footer" role="rowfooter" />
);

const FooterCell: React.FC<HeaderCellProps> = (props) => (
  <HeaderCell {...props} role="columnfooter" _inverseBorder />
);

export { Footer, FooterRow, FooterCell };
