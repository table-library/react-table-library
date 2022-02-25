import * as React from 'react';
import 'loki/configure-react';
import isLokiRunning from '@loki/is-loki-running';

import { DisableAnimationsContext } from './stories/loki.js';

const Features = [
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
  'Data Grid',
  'Column Hiding',
  'Column Ordering',
  'Column Grouping (WIP)',
];

export const parameters = {
  layout: 'fullscreen',
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
        'Getting Started',
        ['Introduction', 'Feature Requests', 'Roadmap', 'Support'],
        'First Steps',
        ['Compact Table', 'Composed Table'],
        'Types',
        ['Data', 'Compact Table', 'Composed Table', ...Features],
        'Compact Table',
        ['FAQ', 'Base', ...Features],
        'Library Themes',
        [
          'Mantine',
          'Material UI (WIP)',
          'Semantic UI (WIP)',
          'Bootstrap UI (WIP)',
          'Ant Design (WIP)',
        ],
        'Product Themes',
        ['Google Drive (WIP)', 'Stripe (WIP)'],
        'Features',
        Features,
        'Composites',
        ['Sort & Select', 'Tree & Select', 'Tree & Sort'],
        'CRUD',
        ['Create', 'Update', 'Delete'],
        'Misc',
        ['Cell', 'Row', 'Column'],
        'Recipes',
        ['Controlled'],
        'Client vs Server',
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
        ['Origin Table', 'Origin External', 'Origin Mixed', 'Debounce', 'Overlay', 'Hybrid'],
        'Kitchen Sink',
        ['CSV Download', 'PDF Download', 'Image Download'],
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <DisableAnimationsContext.Provider value={isLokiRunning()}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    </DisableAnimationsContext.Provider>
  ),
];
