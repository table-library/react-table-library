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
  highlightOnHover?: boolean;
};

type OptionsSound = {
  horizontalSpacing: number;
  verticalSpacing: number;
  striped: boolean;
  highlightOnHover: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommonTheme = (options: OptionsSound, _: ConfigurationSound) => ({
  Table: `
    font-size: 14px;

    .caption-container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    caption {
      color: #868e96;
    }
  `,
  HeaderRow: `
    &.tr-footer {
      border-bottom: 1px solid transparent;
    }
  `,
  Row: `
    &.row-select.row-select-single-selected, &.row-select.row-select-selected {
      background-color: #b3dcff;
      border-bottom: 1px solid #b3dcff;
    }
  `,
  BaseRow: `
    font-size: 14px;

    border-bottom: 1px solid #dee2e6;
  `,
  BaseCell: `
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;

    padding: ${options.verticalSpacing}px ${options.horizontalSpacing}px;

    & > div {
      padding: 0;
    }
  `,
  HeaderCell: `
    font-weight: bold;
    color: #495057;
  `,
  Cell: `
    color: #000000;

    & .match {
      font-weight: bold;
      color: #212121;
    }
  `,
});

const getVirtualizedHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      & > div:hover > div {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Body: `
    & > div:nth-child(odd) > div {
      background-color: ${options.striped ? '#f8f9fa' : '#ffffff'};
    }

    & > div:nth-child(even) > div {
      background-color: #ffffff;
    }

    ${getVirtualizedHighlight(options.highlightOnHover)}
  `,
});

const getDefaultHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      &:hover {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDefaultTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Row: `
    &:nth-child(odd) {
      background-color: ${options.striped ? '#f8f9fa' : '#ffffff'};
    }

    &:nth-child(even) {
      background-color: #ffffff;
    }

    ${getDefaultHighlight(options.highlightOnHover)}
  `,
});

const getTheme = (options: OptionsSound, configuration: ConfigurationSound) => {
  const commonTheme = getCommonTheme(options, configuration);

  const mantineTheme = configuration.isVirtualized
    ? getVirtualizedTheme(options, configuration)
    : getDefaultTheme(options, configuration);

  return zipThemes([commonTheme, mantineTheme]);
};

export const DEFAULT_OPTIONS = {
  horizontalSpacing: 10,
  verticalSpacing: 10,
  striped: false,
  highlightOnHover: false,
};

export const DEFAULT_CONFIGURATION = {
  isVirtualized: false,
};

export const getMantineTheme = (options?: Options, configuration?: Configuration) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  const mergedConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...(configuration ? configuration : {}),
  };

  return getTheme(mergedOptions, mergedConfiguration);
};
