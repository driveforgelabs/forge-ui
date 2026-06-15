import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-spinner.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-spinner',
  component: 'forge-spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the dimensions and stroke width of the spinner',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: { size: 'md' },
  render: ({ size }) => html`<forge-spinner size=${size}></forge-spinner>`,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Medium: Story = { args: { size: 'md' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const InlineLoading: Story = {
  name: 'Inline Loading Example',
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; color: var(--fg-1); font-family: var(--font-body); font-size: 14px;">
      <button style="display: inline-flex; align-items: center; gap: 8px; background: var(--forge); border: none; color: white; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 500; cursor: pointer;">
        <forge-spinner size="sm" style="color: white;"></forge-spinner>
        Processing...
      </button>

      <div style="display: flex; align-items: center; gap: 8px;">
        <forge-spinner size="sm"></forge-spinner>
        <span>Loading telemetry...</span>
      </div>
    </div>
  `,
};
