import * as React from 'react';
import 'loki/configure-react';

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting Started',
        ['Introduction', 'Roadmap'],
        'First Steps',
        ['Demo', 'Table', 'Create', 'Update', 'Delete'],
        'Library Themes',
        ['Material UI', 'Semantic UI', 'Bootstrap UI', 'Ant Design'],
        'Features',
        [
          'Theme',
          'Layout',
          'Resize',
          'Sort',
          'Search',
          'Filter',
          'Select',
          'Tree',
          'Expand',
          'Pagination',
          'Fixed Header',
          'Horizontal Scroll',
          'Pin',
          'Ten Thousand Rows',
          'Column Hiding',
          'Column Ordering',
          'Column Grouping (WIP)',
        ],
        'Composites',
        ['Sort & Select (WIP)', 'Tree & Select', 'Tree & Sort'],
        'Misc',
        ['Cell', 'Row', 'Column', 'Configuration (WIP)'],
        'Product Themes',
        ['Google Drive (WIP)', 'Stripe (WIP)'],
        'Recipes',
        ['Controlled'],
        'Server',
        [
          'Table',
          'Sort',
          'Search',
          'Filter',
          'Expand',
          'Fetch',
          'Tree',
          'Pagination',
          'Infinite Scroll (WIP)',
        ],
        'Server Recipes',
        [
          'Origin Table',
          'Origin External',
          'Origin Mixed',
          'Debounce',
          'Overlay',
          'Hybrid',
        ],
        'Kitchen Sink',
        ['CSV Download', 'PDF Download', 'Image Download'],
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Story />
    </div>
  ),
];
