import * as React from 'react';
import { storiesOf } from '@storybook/react';
import prettier from 'prettier/standalone';
import tsParser from 'prettier/parser-typescript';

export const createStory = (key, Component, code) => ({
  key,
  Component,
  code: prettier.format(code, {
    parser: 'typescript',
    plugins: [tsParser],
  }),
});

export const createStories = (
  path,
  stories,
  component,
  subcomponents,
) => {
  const storyContainer = storiesOf(path, module).addParameters({
    component,
    subcomponents,
  });

  stories.forEach((story) => {
    storyContainer.add(story.key, () => <story.Component />, {
      docs: {
        source: { state: 'closed', code: story.code || '' },
      },
    })
  });
};
