import * as React from 'react';
import 'loki/configure-react';

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting Started',
        ['Introduction', 'Roadmap'],
        'First Steps',
        [
          'Table',
          'Cell',
          'Row',
          'CRUD',
          'Column',
          'Configuration (WIP)',
        ],
        'Features',
        [
          'Theme',
          'Layout',
          'Resize',
          'Sort',
          'Search',
          'Filter (WIP)',
          'Select',
          'Tree',
          'Expand',
          'Pagination (WIP)',
          'Column Hiding',
          'Column Ordering',
          'Column Grouping (WIP)',
        ],
        'Composites',
        ['Sort & Select (WIP)', 'Tree & Select', 'Tree & Sort'],
        'Library Themes',
        [
          'Material UI (WIP)',
          'Semantic UI (WIP)',
          'Bootstrap UI (WIP)',
        ],
        'Product Themes',
        ['Google Drive (WIP)', 'Stripe (WIP)'],
        'Recipes',
        ['Controlled', 'Large Table (WIP)', 'Memoized Row (WIP)'],
        'Server',
        [
          'Table',
          'Sort',
          'Search',
          'Filter (WIP)',
          'Expand',
          'Fetch',
          'Tree',
          'Pagination (WIP)',
          'Column Hiding (WIP)',
          'Infinite Scroll (WIP)',
        ],
        'Server Recipes',
        [
          'Origin Table',
          'Origin External',
          'Origin Mixed',
          'Debounce',
          'Hybrid',
        ],
        'Kitchen Sink',
        ['Tree'],
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];
