import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-tooltip.js';
import '../forge-button.js';
import '../forge-badge.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-tooltip',
  component: 'forge-tooltip',
  tags: ['autodocs'],
  argTypes: {
    tip: {
      control: 'text',
      description: 'Tooltip text content',
    },
    placement: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'],
      table: { defaultValue: { summary: 'top' } },
    },
  },
  args: { tip: 'Engine coolant temperature', placement: 'top' },
  render: ({ tip, placement }) => html`
    <div style="display:flex;justify-content:center;padding:48px;">
      <forge-tooltip tip=${tip} placement=${placement}>
        <forge-badge type="warn">92 °C</forge-badge>
      </forge-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const Bottom: Story = {
  args: { placement: 'bottom', tip: 'Below the element' },
  render: ({ tip }) => html`
    <div style="display:flex;justify-content:center;padding:48px;">
      <forge-tooltip tip=${tip} placement="bottom">
        <forge-button variant="ghost">Hover me</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const Left: Story = {
  args: { placement: 'left', tip: 'Left side tooltip' },
  render: ({ tip }) => html`
    <div style="display:flex;justify-content:center;padding:48px;">
      <forge-tooltip tip=${tip} placement="left">
        <forge-button>Action</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const Right: Story = {
  args: { placement: 'right', tip: 'Right side tooltip' },
  render: ({ tip }) => html`
    <div style="display:flex;justify-content:center;padding:48px;">
      <forge-tooltip tip=${tip} placement="right">
        <forge-button variant="secondary">Settings</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const AllPlacements: Story = {
  name: 'All placements',
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:48px;padding:48px;max-width:400px;margin:auto;">
      ${(['top', 'bottom', 'left', 'right'] as const).map(
        p => html`
          <div style="display:flex;justify-content:center;">
            <forge-tooltip tip="Placement: ${p}" placement=${p}>
              <forge-button variant="ghost">${p}</forge-button>
            </forge-tooltip>
          </div>
        `
      )}
    </div>
  `,
};

export const OnBadge: Story = {
  name: 'On badges',
  render: () => html`
    <div style="display:flex;gap:16px;flex-wrap:wrap;padding:24px;justify-content:center;">
      <forge-tooltip tip="All systems nominal">
        <forge-badge type="ok">OK</forge-badge>
      </forge-tooltip>
      <forge-tooltip tip="Coolant temp above threshold">
        <forge-badge type="warn">WARN</forge-badge>
      </forge-tooltip>
      <forge-tooltip tip="Oil pressure critical">
        <forge-badge type="crit">CRIT</forge-badge>
      </forge-tooltip>
      <forge-tooltip tip="New telemetry data available">
        <forge-badge type="info">INFO</forge-badge>
      </forge-tooltip>
    </div>
  `,
};
