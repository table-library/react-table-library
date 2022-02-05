import * as React from 'react';

// export const isNotRowClick = event => {
//   return event.target.tagName !== 'DIV' || event.target.title;
// };

export const isRowClick = (event: React.SyntheticEvent | React.KeyboardEvent) =>
  (event.target as HTMLElement).tagName === 'DIV' ||
  (event.target as HTMLElement).tagName === 'SPAN';
