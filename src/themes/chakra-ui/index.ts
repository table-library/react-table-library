import { zipThemes } from '@table-library/react-table-library/theme/index';

type Configuration = {
  isVirtualized?: boolean;
};

type ConfigurationSound = {
  isVirtualized: boolean;
};

type Options = {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  striped?: boolean;
};

type OptionsSound = {
  horizontalSpacing: number;
  verticalSpacing: number;
  striped: boolean;
};

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

    .tr-footer {
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid transparent;
    }
  `,
  BaseRow: `
    color: #4a5568;
  `,
  HeaderRow: `
    text-transform: uppercase;
    font-size: 12px;

    font-weight: bold;

    border-bottom: 1px solid #e2e8f0;
  `,
  Row: `
    font-size: 16px;

    &.row-select.row-select-single-selected, &.row-select.row-select-selected {
      background-color: #81E6D9;
      border-bottom: 1px solid #81E6D9;
    }
  `,
  BaseCell: `
    padding: ${options.verticalSpacing}px 0;
    &:first-of-type {
      padding-left: ${options.horizontalSpacing}px;
    }
    &:last-of-type {
      padding-right: ${options.horizontalSpacing}px;
    }

    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
  `,
  HeaderCell: `
    & > div {
      padding-top: 3px;
      padding-bottom: 3px;
    }
  `,
  Cell: `
    &.stiff > div {
      display: flex;
    }
  `,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Body: `
    & > div:not(:last-of-type) > .tr {
      border-bottom: 1px solid #e2e8f0;
    }

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
    &.tr:not(:last-of-type) {
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

export const getTheme = (options?: Options, configuration?: Configuration) => {
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
