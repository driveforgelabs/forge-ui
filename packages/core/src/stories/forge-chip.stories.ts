import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-chip.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-chip',
  component: 'forge-chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['filled', 'outline', 'pill'],
      description: 'Shape and fill style',
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      control: 'select',
      options: ['forge', 'green', 'amber', 'red', 'blue', 'neutral', 'purple'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    dot: {
      control: 'boolean',
      description: 'Show a status dot before the label',
    },
    label: {
      control: 'text',
      name: 'label (slot)',
      table: { category: 'slots' },
    },
  },
  args: {
    variant: 'filled',
    color: 'neutral',
    dot: false,
    label: 'Stage 2',
  },
  render: ({ variant, color, dot, label }) => html`
    <forge-chip variant=${variant} color=${color} ?dot=${dot}>${label}</forge-chip>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Filled: Story = {
  args: { variant: 'filled', color: 'forge', label: 'Stage 2' },
};

export const Pill: Story = {
  args: { variant: 'pill', color: 'green', dot: true, label: 'Live' },
};

export const Outline: Story = {
  args: { variant: 'outline', color: 'forge', label: 'Open-source' },
};

export const StatusPills: Story = {
  name: 'Status pills',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <forge-chip variant="pill" color="green"   dot>Live</forge-chip>
      <forge-chip variant="pill" color="amber"   dot>Warning</forge-chip>
      <forge-chip variant="pill" color="red"     dot>Critical</forge-chip>
      <forge-chip variant="pill" color="neutral" dot>Offline</forge-chip>
      <forge-chip variant="pill" color="blue"    dot>Logging</forge-chip>
    </div>
  `,
};

export const TagChips: Story = {
  name: 'Tag chips',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <forge-chip color="forge">Stage 2</forge-chip>
      <forge-chip color="green">Passing</forge-chip>
      <forge-chip color="amber">Review</forge-chip>
      <forge-chip color="red">Knock</forge-chip>
      <forge-chip color="blue">CAN</forge-chip>
      <forge-chip color="neutral">Draft</forge-chip>
      <forge-chip color="purple">Experimental</forge-chip>
    </div>
  `,
};

export const OutlineChips: Story = {
  name: 'Outline chips',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <forge-chip variant="outline" color="forge">Open-source</forge-chip>
      <forge-chip variant="outline" color="green">↑ Active signal</forge-chip>
      <forge-chip variant="outline" color="neutral">Archived</forge-chip>
      <forge-chip variant="outline" color="blue">OBD-II</forge-chip>
      <forge-chip variant="outline" color="amber">⚠ Lean</forge-chip>
    </div>
  `,
};

export const AllColors: Story = {
  name: 'All colors × variants',
  render: () => {
    const colors = ['forge', 'green', 'amber', 'red', 'blue', 'neutral', 'purple'] as const;
    return html`
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${(['filled', 'pill', 'outline'] as const).map(
          (v) => html`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              <span style="font-family:var(--font-mono);font-size:10px;color:var(--fg-3);min-width:52px;">${v}</span>
              ${colors.map((c) => html`<forge-chip variant=${v} color=${c}>${c}</forge-chip>`)}
            </div>
          `
        )}
      </div>
    `;
  },
};
