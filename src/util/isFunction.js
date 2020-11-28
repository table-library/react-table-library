export const isFunction = functionToCheck =>
  functionToCheck &&
  {}.toString.call(functionToCheck) === '[object Function]';
