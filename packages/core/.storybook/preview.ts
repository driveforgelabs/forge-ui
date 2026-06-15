import type { Preview } from '@storybook/web-components-vite';
import '../../tokens/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#0F0F12' },
        { name: 'surface', value: '#1A1A1F' },
        { name: 'cluster', value: '#08080A' },
        { name: 'light',   value: '#F4F4F5' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
