import * as React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('00. Intro/ 06. Roadmap', module).add('default', () => {
  return (
    <div>
      Discussions:
      https://github.com/table-library/react-table-library/discussions
      links to github issues
      <ul>
        <li>
          WIP Features: With Pagination and Responsiveness having the
          highest priority, ...
        </li>
        <li>TypeScript Support: ...</li>
        <li>Zero Dependencies: ...</li>
      </ul>
    </div>
  );
});
