import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-number-input.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-number-input',
  component: 'forge-number-input',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current numeric value',
      table: { defaultValue: { summary: '0' } },
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Increment/decrement step size',
      table: { defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 5,
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
  },
  render: ({ value, min, max, step, disabled }) => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <label style="font-family: var(--font-body); font-size: 13px; color: var(--fg-2);">Traction Control Setting</label>
      <forge-number-input
        .value=${value}
        .min=${min}
        .max=${max}
        .step=${step}
        ?disabled=${disabled}
      ></forge-number-input>
      <span style="font-family: var(--font-body); font-size: 11px; color: var(--fg-3);">
        Range: ${min} to ${max} (Step: ${step})
      </span>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: {},
};

export const DecimalFloat: Story = {
  args: {
    value: 1.5,
    min: 0,
    max: 5,
    step: 0.1,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WideRange: Story = {
  args: {
    value: 100,
    min: -1000,
    max: 1000,
    step: 50,
  },
};
