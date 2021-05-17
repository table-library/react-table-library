import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import { version } from '../package.json';

addons.setConfig({
  theme: create({
    brandTitle: `React Table Library (v${version} Beta)`,
    brandUrl: 'https://github.com/table-library/react-table-library',
  }),
  showPanel: false,
});
