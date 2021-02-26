export const includesAll = (idsOne, idsTwo) => {
  return idsOne.every((id) => idsTwo.includes(id));
};
