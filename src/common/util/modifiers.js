export const applyModifiers = ({ nodes, sort, pagination, tree }) => {
  let modifiedNodes = [...nodes];

  modifiedNodes = sort
    ? sort._modifier(modifiedNodes)
    : modifiedNodes;

  modifiedNodes = pagination
    ? pagination._modifier(modifiedNodes)
    : modifiedNodes;

  modifiedNodes = tree
    ? tree._modifier(modifiedNodes)
    : modifiedNodes;

  return modifiedNodes;
};
