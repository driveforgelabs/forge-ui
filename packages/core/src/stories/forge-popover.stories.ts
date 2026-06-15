import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-popover.js';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-popover',
  component: 'forge-popover',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the popover is open',
    },
    align: {
      control: 'select',
      options: ['left', 'right', 'center'],
      description: 'Popover alignment relative to trigger',
      table: { defaultValue: { summary: 'center' } },
    },
  },
  args: {
    open: false,
    align: 'center',
  },
  render: ({ open, align }) => html`
    <div style="height: 150px; display: flex; align-items: flex-start; justify-content: center; padding-top: 20px;">
      <forge-popover ?open=${open} align=${align}>
        <forge-button slot="trigger">Toggle Popover</forge-button>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <h4 style="margin: 0; font-family: var(--font-body); color: var(--fg-1);">Filter Options</h4>
          <p style="margin: 0; font-size: 12px; font-family: var(--font-body); color: var(--fg-2);">Customize your search settings.</p>
          <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
            <forge-button size="sm" variant="ghost">Reset</forge-button>
            <forge-button size="sm" variant="primary">Apply</forge-button>
          </div>
        </div>
      </forge-popover>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: {},
};

export const AlignLeft: Story = {
  args: { align: 'left' },
};

export const AlignRight: Story = {
  args: { align: 'right' },
};

export const InitiallyOpen: Story = {
  args: { open: true },
};
