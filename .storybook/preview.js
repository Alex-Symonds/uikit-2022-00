export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'mid',
    values: [
      {
        name: 'mid',
        value: '#CCC',
      },
      {
        name: 'light',
        value: '#FFF',
      },
      {
        name: 'dark',
        value: '#6E41E2',
      },
    ],
  },
}