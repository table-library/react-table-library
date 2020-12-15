// TODO

// import { TREE_LIST } from './tree';

// const SORTS = {
//   none: array => array,
//   name: array => array.sort((a, b) => a.name.localeCompare(b.name)),
//   stars: array => array.sort((a, b) => a.stars - b.stars),
//   light: array => array.sort((a, b) => a.light - b.light),
//   count: array => array.sort((a, b) => a.count - b.count)
// };

export const get = (
  {
    // search = '',
    // sortKey = 'none',
    // sortReverse = false
  }
) =>
  new Promise(resolve => {
    // let modifiedTree = [...TREE_LIST];
    let modifiedTree = [];

    // // search
    // modifiedTree = modifiedTree.filter(item =>
    //   item.name.toLowerCase().includes(search.toLowerCase())
    // );

    // // sort
    // modifiedTree = sortReverse
    //   ? SORTS[sortKey](modifiedTree).reverse()
    //   : SORTS[sortKey](modifiedTree);

    setTimeout(() => resolve(modifiedTree), TIMEOUT);
  });
