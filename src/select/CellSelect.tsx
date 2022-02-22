import * as React from 'react';

import { Cell } from '@table-library/react-table-library/table/Cell';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';

import { SelectTypes, CellSelectProps } from '@table-library/react-table-library/types/select';

import { Checkbox } from './Checkbox';

const CellSelect = React.memo(({ item, ...passThrough }: CellSelectProps) => {
  const select = React.useContext(SelectContext);

  if (!select) {
    throw new Error(
      'No Select Context. No return value from useRowSelect provided to Table component.',
    );
  }

  const isSelected =
    select.options.buttonSelect === SelectTypes.SingleSelect
      ? select.state.id === item.id || select.state.ids.includes(item.id)
      : select.state.ids.includes(item.id);

  const handleChange = () => {
    const isSingleSelect = select.options.buttonSelect === SelectTypes.SingleSelect;

    if (isSingleSelect) {
      select.fns.onToggleByIdExclusively(item.id);
    } else {
      select.fns.onToggleByIdRecursively(item.id, {
        isCarryForward: select.options.isCarryForward,
        isPartialToAll: select.options.isPartialToAll,
      });
    }
  };

  return (
    <Cell stiff {...passThrough}>
      <Checkbox checked={!!isSelected} onChange={handleChange} />
    </Cell>
  );
});

export { CellSelect };
