import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-input.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-input',
  component: 'forge-input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Field label' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'number', 'password', 'email', 'search'],
      table: { defaultValue: { summary: 'text' } },
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'success', 'error'],
      description: 'Validation state — changes border colour and hint colour',
      table: { defaultValue: { summary: 'default' } },
    },
    hint: { control: 'text', description: 'Helper / validation message below the field' },
    prefix: { control: 'text', description: 'Symbol before the input (e.g. ±)' },
    suffix: { control: 'text', description: 'Unit after the input (e.g. RPM)' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Session name',
    placeholder: 'Track day — Portimão R2',
    value: '',
    type: 'text',
    state: 'default',
    hint: '',
    prefix: '',
    suffix: '',
    disabled: false,
    required: false,
  },
  render: ({ label, placeholder, value, type, state, hint, prefix, suffix, disabled, required }) => html`
    <forge-input
      style="width:320px;display:block;"
      label=${label}
      placeholder=${placeholder}
      value=${value}
      type=${type}
      state=${state}
      hint=${hint}
      prefix=${prefix}
      suffix=${suffix}
      ?disabled=${disabled}
      ?required=${required}
    ></forge-input>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { label: 'Rev limiter', value: '7200', suffix: 'RPM' },
};

export const Success: Story = {
  args: { label: 'Rev limiter', value: '7200', suffix: 'RPM', state: 'success', hint: 'Within safe limits' },
};

export const Error: Story = {
  args: {
    label: 'Fuel trim offset',
    value: '8.5',
    prefix: '±',
    suffix: '%',
    state: 'error',
    hint: 'Exceeds ±8% safe range',
  },
};

export const Disabled: Story = {
  args: { label: 'ECU locked', value: 'Stage 2 — Street', disabled: true },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
      <forge-input label="Default" placeholder="Enter value"></forge-input>
      <forge-input label="Rev limiter" value="7200" suffix="RPM" state="success" hint="Within safe limits"></forge-input>
      <forge-input label="Fuel trim" value="8.5" prefix="±" suffix="%" state="error" hint="Exceeds ±8% safe range"></forge-input>
      <forge-input label="ECU locked" value="Stage 2 — Street" disabled></forge-input>
    </div>
  `,
};
