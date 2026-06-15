import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { SelectOption } from '../forge-select.js';
import '../forge-select.js';

const MAP_OPTIONS: SelectOption[] = [
  { value: 'stage2-street', label: 'Stage 2 — Street' },
  { value: 'stage2-track',  label: 'Stage 2 — Track' },
  { value: 'custom',        label: 'Custom baseline' },
];

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-select',
  component: 'forge-select',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    state: {
      control: 'inline-radio',
      options: ['default', 'success', 'error'],
      table: { defaultValue: { summary: 'default' } },
    },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Map profile',
    placeholder: '',
    value: 'stage2-street',
    state: 'default',
    hint: '',
    disabled: false,
  },
  render: ({ label, placeholder, value, state, hint, disabled }) => html`
    <forge-select
      id="story-select"
      style="width:280px;display:block;"
      label=${label}
      placeholder=${placeholder}
      value=${value}
      state=${state}
      hint=${hint}
      ?disabled=${disabled}
    ></forge-select>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-select');
    const el = canvasElement.querySelector('#story-select') as any;
    if (el) el.options = MAP_OPTIONS;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { label: 'Select profile', placeholder: 'Choose a map…', value: '' },
};

export const Error: Story = {
  args: { state: 'error', hint: 'Select a valid map before flashing', value: '' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
