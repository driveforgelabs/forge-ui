import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-checkbox.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-checkbox',
  component: 'forge-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked:       { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled:      { control: 'boolean' },
    label:         { control: 'text' },
  },
  args: { checked: false, indeterminate: false, disabled: false, label: 'Enable sensor' },
  render: ({ checked, indeterminate, disabled, label }) => html`
    <forge-checkbox
      ?checked=${checked}
      ?indeterminate=${indeterminate}
      ?disabled=${disabled}
      label=${label}
    ></forge-checkbox>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story   = { args: { checked: false, label: 'Enable sensor' } };
export const Checked: Story   = { args: { checked: true,  label: 'Logging active' } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Partial selection' } };
export const Disabled: Story  = { args: { disabled: true, label: 'Unavailable' } };

export const FilterList: Story = {
  name: 'Filter list',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:10px;">
      <forge-checkbox label="Engine sensors" checked indeterminate></forge-checkbox>
      <div style="padding-left:24px;display:flex;flex-direction:column;gap:10px;">
        <forge-checkbox label="RPM" checked></forge-checkbox>
        <forge-checkbox label="Coolant temp" checked></forge-checkbox>
        <forge-checkbox label="Oil pressure"></forge-checkbox>
        <forge-checkbox label="Throttle position" checked></forge-checkbox>
      </div>
      <forge-checkbox label="GPS" checked></forge-checkbox>
      <forge-checkbox label="IMU" disabled></forge-checkbox>
    </div>
  `,
};
