import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-drawer.js';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-drawer',
  component: 'forge-drawer',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls drawer visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    position: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Side from which the drawer slides in',
      table: { defaultValue: { summary: 'right' } },
    },
    heading: {
      control: 'text',
      description: 'Drawer title',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Drawer width',
      table: { defaultValue: { summary: 'md' } },
    },
    noClose: {
      control: 'boolean',
      name: 'no-close',
      description: 'Hide close button and prevent backdrop dismiss',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    open: false,
    position: 'right',
    heading: 'System Logs',
    size: 'md',
    noClose: false,
  },
  render: ({ open, position, heading, size, noClose }) => {
    const handleClose = () => {
      const drawer = document.querySelector('forge-drawer');
      if (drawer) drawer.open = false;
    };
    const handleOpen = () => {
      const drawer = document.querySelector('forge-drawer');
      if (drawer) drawer.open = true;
    };
    return html`
      <div>
        <forge-button @click=${handleOpen}>Open Drawer</forge-button>
        <forge-drawer
          ?open=${open}
          position=${position}
          heading=${heading}
          size=${size}
          ?no-close=${noClose}
          @forge-close=${handleClose}
        >
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <p>This is the slide-in side drawer. It is ideal for detail views, system logs, configuration dashboards, or complex forms that require high focus.</p>
            <p>You can close this drawer by clicking the close button, clicking the backdrop, or pressing the Escape key.</p>
          </div>
          <div slot="footer">
            <forge-button variant="ghost" @click=${handleClose}>Cancel</forge-button>
            <forge-button variant="primary" @click=${handleClose}>Confirm</forge-button>
          </div>
        </forge-drawer>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const LeftPosition: Story = {
  args: { position: 'left', heading: 'Navigation Menu' },
};

export const SmallSize: Story = {
  args: { size: 'sm', heading: 'Quick View' },
};

export const LargeSize: Story = {
  args: { size: 'lg', heading: 'Advanced Setup' },
};
