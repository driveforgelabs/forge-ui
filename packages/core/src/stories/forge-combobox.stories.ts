import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-combobox.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-combobox',
  component: 'forge-combobox',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value of the combobox',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the combobox',
    },
    label: {
      control: 'text',
      description: 'Combobox label',
    },
    options: {
      control: 'object',
      description: 'Options array: {label, value, disabled?}',
    },
  },
  args: {
    value: '',
    placeholder: 'Select ECU Module...',
    disabled: false,
    label: 'Engine Module selection',
    options: [
      { label: 'Haltech Elite 2500', value: 'haltech' },
      { label: 'MoTeC M150', value: 'motec' },
      { label: 'Link ECU MonsoonX', value: 'link' },
      { label: 'MaxxECU Race H20', value: 'maxxecu' },
      { label: 'Syvecs S7 Plus (Disabled)', value: 'syvecs', disabled: true },
    ],
  },
  render: ({ value, placeholder, disabled, label, options }) => html`
    <div style="height: 300px; width: 320px;">
      <forge-combobox
        .value=${value}
        placeholder=${placeholder}
        ?disabled=${disabled}
        label=${label}
        .options=${options}
        @forge-change=${(e: any) => console.log('Changed value:', e.detail.value)}
      ></forge-combobox>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const Preselected: Story = {
  args: { value: 'motec' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'link' },
};
