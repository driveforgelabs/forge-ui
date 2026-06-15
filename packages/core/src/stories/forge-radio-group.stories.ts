import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-radio-group.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-radio-group',
  component: 'forge-radio-group',
  tags: ['autodocs'],
  argTypes: {
    value:       { control: 'text', description: 'Selected value' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
  args: { value: 'live', orientation: 'vertical' },
  render: ({ value, orientation }) => html`
    <forge-radio-group
      .options=${[
        { value: 'live',   label: 'Live telemetry' },
        { value: 'replay', label: 'Session replay' },
        { value: 'export', label: 'Export only' },
        { value: 'off',    label: 'Disabled', disabled: true },
      ]}
      value=${value}
      orientation=${orientation}
    ></forge-radio-group>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Vertical: Story   = { args: { value: 'live', orientation: 'vertical' } };
export const Horizontal: Story = { args: { value: 'replay', orientation: 'horizontal' } };

export const SampleRateSelector: Story = {
  name: 'Sample rate selector',
  render: () => html`
    <forge-radio-group
      .options=${[
        { value: '10',  label: '10 Hz' },
        { value: '50',  label: '50 Hz' },
        { value: '100', label: '100 Hz' },
        { value: '200', label: '200 Hz (Pro)' },
      ]}
      value="50"
      orientation="horizontal"
    ></forge-radio-group>
  `,
};
