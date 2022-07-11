import * as React from 'react';

export const getPreviousColSpans = (children: React.ReactNode, index: number) => {
  return React.Children.toArray(children).reduce((acc, value, key) => {
    if (!React.isValidElement(value)) return acc;
    if (key >= index) return acc;
    if (!value.props.colSpan) return acc;

    return acc + value.props.colSpan - 1;
  }, 0);
};
