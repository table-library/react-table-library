import * as React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('00. Intro/ 05. Changelog', module).add('default', () => {
  return (
    <p>
      The changelog is automatically updated using
      [semantic-release](https://github.com/semantic-release/semantic-release).
      You can see it on the [releases
      page](https://github.com/table-library/react-table-library/releases).
    </p>
  );
});
