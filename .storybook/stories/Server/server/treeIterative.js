import { TIMEOUT } from './timeout';

const TOP_LEVEL_NODES = [
  {
    id: '1',
    name: 'Empty Folder',
    stars: 24,
    count: 42,
    light: true,
    nodes: [],
    hasContent: false
  },
  {
    id: '2',
    name: 'Images',
    stars: 42,
    count: 24,
    light: false,
    nodes: [],
    hasContent: true
  },
  {
    id: '3',
    name: 'New Folder',
    stars: 111,
    count: 111,
    light: true,
    nodes: [],
    hasContent: false
  },
  {
    id: '4',
    name: 'MyFolder',
    stars: 122,
    count: 133,
    light: false,
    nodes: [],
    hasContent: true
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
    nodes: [],
    hasContent: false
  },
  {
    id: '7',
    name: 'Video3.mp4',
    stars: 155,
    count: 155,
    light: true
  }
];

const NODES_BY_NODE = {
  '1': [],
  '2': [
    {
      id: '62',
      name: 'More Images',
      stars: 322,
      count: 333,
      light: true,
      nodes: [],
      hasContent: true
    },
    {
      id: '64',
      name: 'Some Picture.jpg',
      stars: 522,
      count: 633,
      light: false
    }
  ],
  '62': [
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
      nodes: [],
      hasContent: true
    }
  ],
  '6444': [
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
  ],
  '3': [],
  '4': [
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
  ],
  '6': []
};

export const get = ({ id }) =>
  new Promise(resolve => {
    let modifiedTopLevelNodes = [...TOP_LEVEL_NODES];
    let modifiedNodesByNode = { ...NODES_BY_NODE };

    if (!id) {
      setTimeout(() => resolve(modifiedTopLevelNodes), TIMEOUT);
    } else {
      setTimeout(() => resolve(modifiedNodesByNode[id]), TIMEOUT);
    }
  });
