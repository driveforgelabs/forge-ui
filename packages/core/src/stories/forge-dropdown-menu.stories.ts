import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-dropdown-menu.js';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-dropdown-menu',
  component: 'forge-dropdown-menu',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dropdown visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    align: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Alignment of the dropdown menu',
      table: { defaultValue: { summary: 'left' } },
    },
  },
  args: {
    open: false,
    align: 'left',
  },
  render: ({ open, align }) => html`
    <div style="height: 200px; display: flex; justify-content: center; align-items: flex-start; padding-top: 20px;">
      <forge-dropdown-menu ?open=${open} align=${align} @forge-select=${(e: any) => console.log('Selected:', e.detail.item)}>
        <forge-button slot="trigger">Actions</forge-button>
        <button role="menuitem">Edit profile</button>
        <button role="menuitem">Account settings</button>
        <hr style="border: 0; border-top: 1px solid var(--border); margin: 4px 0;" />
        <button role="menuitem" style="color: var(--data-red);">Delete account</button>
      </forge-dropdown-menu>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const RightAligned: Story = {
  args: { align: 'right' },
};
