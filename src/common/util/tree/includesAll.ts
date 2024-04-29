import { Identifier } from '@overmap-ai/react-table-library/types/table';

export const includesAll = (idsOne: Identifier[], idsTwo: Identifier[]) => {
  return idsOne.every((id) => idsTwo.includes(id));
};

export const includesNone = (idsOne: Identifier[], idsTwo: Identifier[]) => {
  return idsOne.every((id) => !idsTwo.includes(id));
};
