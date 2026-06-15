import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-badge.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-badge',
  component: 'forge-badge',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['ok', 'warn', 'crit', 'info', 'forge', 'muted'],
      description: 'Semantic type — controls colour',
      table: { defaultValue: { summary: 'muted' } },
    },
    label: {
      control: 'text',
      name: 'label (slot)',
      description: 'Badge text. Rendered in uppercase monospace.',
      table: { category: 'slots' },
    },
  },
  args: { type: 'forge', label: 'ACTIVE' },
  render: ({ type, label }) => html`<forge-badge type=${type}>${label}</forge-badge>`,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Active: Story  = { args: { type: 'forge', label: 'ACTIVE' } };
export const Ok: Story      = { args: { type: 'ok',    label: 'OK' } };
export const Warn: Story    = { args: { type: 'warn',  label: 'WARN' } };
export const Critical: Story = { args: { type: 'crit', label: 'CRIT' } };
export const Info: Story    = { args: { type: 'info',  label: 'INFO' } };
export const Muted: Story   = { args: { type: 'muted', label: 'DRAFT' } };

export const AllTypes: Story = {
  name: 'All types',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <forge-badge type="ok">OK</forge-badge>
      <forge-badge type="warn">WARN</forge-badge>
      <forge-badge type="crit">CRIT</forge-badge>
      <forge-badge type="info">INFO</forge-badge>
      <forge-badge type="forge">ACTIVE</forge-badge>
      <forge-badge type="muted">DRAFT</forge-badge>
    </div>
  `,
};
