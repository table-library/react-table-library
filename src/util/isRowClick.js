// export const isNotRowClick = event => {
//   return event.target.tagName !== 'DIV' || event.target.title;
// };

export const isRowClick = event => event.target.tagName === 'DIV';
