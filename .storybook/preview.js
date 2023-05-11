import '../styles/reset.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  desktopHD: {
    name: 'Desktop HD',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFF',
      },
      {
        name: 'mid',
        value: '#CCC',
      },
      {
        name: 'dark',
        value: '#6E41E2',
      },
    ],
  },
  viewport: {
    viewports: {
       ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
}

import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

const withTheme = (StoryFn) => {
  return (
    <ThemeProvider theme={theme}>
      <StoryFn />
    </ThemeProvider>
  )
}

// export all decorators that should be globally applied in an array
export const decorators = [withTheme]