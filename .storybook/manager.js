import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    brandTitle: 'React Table Library',
    brandUrl: 'https://github.com/table-library/react-table-library',
  }),
  showPanel: false,
});
