import { zipThemes } from '@table-library/react-table-library/theme/index';

import { Theme } from '@table-library/react-table-library/types/theme';

type Configuration = {
  isVirtualized?: boolean;
};

type ConfigurationSound = Required<Configuration>;

type Options = {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  striped?: boolean;
};

type OptionsSound = Required<Options>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommonTheme = (options: OptionsSound, _: ConfigurationSound) => ({
  Table: `
    .caption-container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    caption {
      color: #868e96;
    }
  `,
  BaseRow: `
    color: #4a5568;
  `,
  HeaderRow: `
    text-transform: uppercase;
    font-size: 12px;

    &.tr-header .th {
      border-bottom: 1px solid #e2e8f0;
    }

    &.tr-footer .th {
      border-top: 1px solid #e2e8f0;
    }
  `,
  Row: `
    font-size: 16px;

    &.tr.tr-body.row-select.row-select-single-selected, &.tr.tr-body.row-select.row-select-selected {
      background-color: #81E6D9;
      border-bottom: 1px solid #81E6D9;
    }
  `,
  BaseCell: `
    padding: ${options.verticalSpacing}px ${options.horizontalSpacing}px;
  `,
  HeaderCell: `
    & > div {
      padding-top: 3px;
      padding-bottom: 3px;
    }
  `,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Row: `
    & .td {
      border-bottom: 1px solid #e2e8f0;
    }
  `,
  Body: `
    & > div:nth-of-type(odd) > .tr {
      background-color: ${options.striped ? '#E6FFFA' : '#ffffff'};
    }

    & > div:nth-of-type(even) > .tr {
      background-color: #ffffff;
    }
  `,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNoneVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Row: `
    &:not(:last-of-type) > .td {
      border-bottom: 1px solid #e2e8f0;
    }

    &:nth-of-type(odd) {
      background-color: ${options.striped ? '#E6FFFA' : '#ffffff'};
    }

    &:nth-of-type(even) {
      background-color: #ffffff;
    }
  `,
});

const getZipTheme = (options: OptionsSound, configuration: ConfigurationSound) => {
  const commonTheme = getCommonTheme(options, configuration);

  const specificTheme = configuration.isVirtualized
    ? getVirtualizedTheme(options, configuration)
    : getNoneVirtualizedTheme(options, configuration);

  return zipThemes([commonTheme, specificTheme]);
};

export const DEFAULT_OPTIONS = {
  horizontalSpacing: 24,
  verticalSpacing: 12,
  striped: false,
};

export const DEFAULT_CONFIGURATION = {
  isVirtualized: false,
};

export const getTheme = (options?: Options, configuration?: Configuration): Theme => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  const mergedConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...(configuration ? configuration : {}),
  };

  return getZipTheme(mergedOptions, mergedConfiguration);
};
