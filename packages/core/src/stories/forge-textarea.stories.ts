import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-textarea.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-textarea',
  component: 'forge-textarea',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 20 }, table: { defaultValue: { summary: '4' } } },
    state: {
      control: 'inline-radio',
      options: ['default', 'success', 'error'],
      table: { defaultValue: { summary: 'default' } },
    },
    hint: { control: 'text' },
    resize: {
      control: 'inline-radio',
      options: ['none', 'vertical', 'horizontal', 'both'],
      table: { defaultValue: { summary: 'vertical' } },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Build notes',
    placeholder: 'Describe modifications, part numbers, installation notes…',
    value: '',
    rows: 4,
    state: 'default',
    hint: '',
    resize: 'vertical',
    disabled: false,
  },
  render: ({ label, placeholder, value, rows, state, hint, resize, disabled }) => html`
    <forge-textarea
      style="width:400px;display:block;"
      label=${label}
      placeholder=${placeholder}
      value=${value}
      rows=${rows}
      state=${state}
      hint=${hint}
      resize=${resize}
      ?disabled=${disabled}
    ></forge-textarea>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Build notes',
    value: 'Replaced OEM turbo with GTX3076R. Running E30 mix. IAT sensor relocated to pre-intercooler. Wastegate spring upgraded to 14psi.',
  },
};

export const Error: Story = {
  args: { state: 'error', hint: 'Build notes are required before submitting a tune request' },
};

export const NoResize: Story = {
  args: { label: 'Terminal output', resize: 'none', rows: 6, placeholder: '> connecting to ECU…' },
};
