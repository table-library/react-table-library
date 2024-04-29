import * as React from 'react';

import { useSelectContext } from '@overmap-ai/react-table-library/common/context/Select';
import { HeaderCell } from '@overmap-ai/react-table-library/table/Cell';

import { SelectTypes } from '@overmap-ai/react-table-library/types/select';
import { TableNode } from '@overmap-ai/react-table-library/types/table';

import { Checkbox } from './Checkbox';

type HeaderCellSelectProps = Record<string, any>;

export const HeaderCellSelect = React.memo(
  <T extends TableNode>(passThrough: HeaderCellSelectProps) => {
    const select = useSelectContext<T>();

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
