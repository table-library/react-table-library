import cs from 'classnames';

const classnames = (
  classNames = [],
  className = '',
  styles = {},
  conditionalStyles = {}
) => {
  const mappedStyles = className
    .split(' ')
    .map((v) => styles[v])
    .filter(Boolean);

  return cs(...classNames, ...mappedStyles, conditionalStyles);
};

export { classnames };
