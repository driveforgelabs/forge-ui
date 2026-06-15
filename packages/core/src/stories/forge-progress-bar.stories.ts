import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-progress-bar.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-progress-bar',
  component: 'forge-progress-bar',
  tags: ['autodocs'],
  argTypes: {
    value:     { control: 'range', min: 0, max: 100 },
    max:       { control: 'number' },
    color:     { control: 'select', options: ['forge', 'green', 'amber', 'red', 'blue'] },
    label:     { control: 'text' },
    showValue: { control: 'boolean' },
  },
  args: { value: 65, max: 100, color: 'forge', label: 'Throttle', showValue: true },
  render: ({ value, max, color, label, showValue }) => html`
    <div style="max-width:320px;">
      <forge-progress-bar
        value=${value}
        max=${max}
        color=${color}
        label=${label}
        ?show-value=${showValue}
      ></forge-progress-bar>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story  = { args: { value: 65, color: 'forge', label: 'Throttle', showValue: true } };
export const Green: Story    = { args: { value: 88, color: 'green', label: 'Fuel',     showValue: true } };
export const Warning: Story  = { args: { value: 82, color: 'amber', label: 'Coolant',  showValue: true } };
export const Critical: Story = { args: { value: 95, color: 'red',   label: 'Oil temp', showValue: true } };
export const NoLabel: Story  = { args: { value: 40, color: 'blue' } };

export const TelemetryPanel: Story = {
  name: 'Telemetry panel',
  render: () => html`
    <div style="max-width:280px;display:flex;flex-direction:column;gap:14px;">
      <forge-progress-bar value="78" color="forge" label="Throttle"    show-value></forge-progress-bar>
      <forge-progress-bar value="92" color="red"   label="Brake bias"  show-value></forge-progress-bar>
      <forge-progress-bar value="55" color="green" label="Fuel level"  show-value></forge-progress-bar>
      <forge-progress-bar value="87" color="amber" label="Coolant"     show-value></forge-progress-bar>
      <forge-progress-bar value="43" color="blue"  label="Battery"     show-value></forge-progress-bar>
    </div>
  `,
};
