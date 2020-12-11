const TIMEOUT = 250;

const TREE = [
  {
    id: '1',
    name: 'Empty Folder',
    stars: 24,
    count: 42,
    light: true,
    nodes: []
  },
  {
    id: '2',
    name: 'Images',
    stars: 42,
    count: 24,
    light: false,
    nodes: [
      {
        id: '62',
        name: 'More Images',
        stars: 322,
        count: 333,
        light: true,
        nodes: [
          {
            id: '6442',
            name: 'Image 1.png',
            stars: 2322,
            count: 3333,
            light: true
          },
          {
            id: '6444',
            name: 'Old Images',
            stars: 3522,
            count: 3633,
            light: false,
            nodes: [
              {
                id: '64422',
                name: 'Image 1.jpg',
                stars: 423224,
                count: 233334,
                light: true
              },
              {
                id: '64144',
                name: 'Image 3.jpg',
                stars: 135224,
                count: 136334,
                light: false
              }
            ]
          }
        ]
      },
      {
        id: '64',
        name: 'Some Picture.jpg',
        stars: 522,
        count: 633,
        light: false
      }
    ]
  },
  {
    id: '3',
    name: 'New Folder',
    stars: 111,
    count: 111,
    light: true,
    nodes: []
  },
  {
    id: '4',
    name: 'MyFolder',
    stars: 122,
    count: 133,
    light: false,
    nodes: [
      {
        id: '42',
        name: 'Video 1.mp4',
        stars: 422,
        count: 433,
        light: true
      },
      {
        id: '44',
        name: 'Video 2.mp4',
        stars: 222,
        count: 233,
        light: false
      }
    ]
  },
  {
    id: '5',
    name: 'Some Video.mp4',
    stars: 133,
    count: 122,
    light: true
  },
  {
    id: '6',
    name: 'Empty Folder 2',
    stars: 155,
    count: 155,
    light: true,
    nodes: []
  },
  {
    id: '7',
    name: 'Video3.mp4',
    stars: 155,
    count: 155,
    light: true
  }
];

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
    let modifiedTree = [...TREE];

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
