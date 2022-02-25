import * as React from 'react';

import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { HeaderCell } from '@table-library/react-table-library/table/Cell';

import { SelectTypes } from '@table-library/react-table-library/types/select';

import { Checkbox } from './Checkbox';

type HeaderCellSelectProps = Record<string, any>;

export const HeaderCellSelect: React.FC<HeaderCellSelectProps> = React.memo(
  (passThrough: HeaderCellSelectProps) => {
    const select = React.useContext(SelectContext);

    if (!select) {
      throw new Error(
        'No Select Context. No return value from useRowSelect provided to Table component.',
      );
    }

    const isSelected = select.state.all;
    const isIndeterminate =
      (!select.state.all && !select.state.none) ||
      (select.options.buttonSelect === SelectTypes.SingleSelect && select.state.id != null);

    const handleChange = () =>
      select.fns.onToggleAll({
        isPartialToAll: select.options.isPartialToAll,
      });

    return (
      <HeaderCell stiff {...passThrough}>
        <Checkbox
          checked={!!isSelected}
          isIndeterminate={isIndeterminate}
          onChange={handleChange}
        />
      </HeaderCell>
    );
  },
);
