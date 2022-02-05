export const includesAll = (idsOne: string[], idsTwo: string[]) => {
  return idsOne.every((id) => idsTwo.includes(id));
};

export const includesNone = (idsOne: string[], idsTwo: string[]) => {
  return idsOne.every((id) => !idsTwo.includes(id));
};
