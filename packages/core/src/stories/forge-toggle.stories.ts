import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-toggle.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-toggle',
  component: 'forge-toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Toggled state',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Text label rendered beside the track',
    },
  },
  args: { checked: false, disabled: false, label: 'Enable logging' },
  render: ({ checked, disabled, label }) => html`
    <forge-toggle ?checked=${checked} ?disabled=${disabled} label=${label}></forge-toggle>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: { checked: false, label: 'Enable logging' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Telemetry active' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable' },
};

export const DisabledChecked: Story = {
  name: 'Disabled + checked',
  args: { checked: true, disabled: true, label: 'Locked on' },
};

export const NoLabel: Story = {
  name: 'No label',
  render: () => html`<forge-toggle checked></forge-toggle>`,
};

export const ControlGroup: Story = {
  name: 'Control group',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <forge-toggle label="CAN bus logging"></forge-toggle>
      <forge-toggle label="Live telemetry" checked></forge-toggle>
      <forge-toggle label="OBD-II polling" checked></forge-toggle>
      <forge-toggle label="GPS tracking"></forge-toggle>
      <forge-toggle label="Crash reporting" disabled></forge-toggle>
    </div>
  `,
};
