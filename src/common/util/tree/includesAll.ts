import { Identifier } from '@table-library/react-table-library/types/table';

export const includesAll = (idsOne: Identifier[], idsTwo: Identifier[]) => {
  return idsOne.every((id) => idsTwo.includes(id));
};

export const includesNone = (idsOne: Identifier[], idsTwo: Identifier[]) => {
  return idsOne.every((id) => !idsTwo.includes(id));
};
