import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-button',
  component: 'forge-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — blocks interaction and reduces opacity',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      table: { defaultValue: { summary: 'button' } },
    },
    label: {
      control: 'text',
      name: 'label (slot)',
      description: 'Default slot content',
      table: { category: 'slots' },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
    label: 'Save tune',
  },
  render: ({ variant, size, disabled, type, label }) => html`
    <forge-button
      variant=${variant}
      size=${size}
      type=${type}
      ?disabled=${disabled}
    >${label}</forge-button>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Primary: Story = {
  args: { variant: 'primary', label: 'Save tune' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Open session' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Cancel' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete map' },
};

export const Success: Story = {
  args: { variant: 'success', label: '● Live session' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, label: 'Disabled' },
};

export const Small: Story = {
  args: { size: 'sm', label: 'Save tune' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Save tune' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="danger">Delete map</forge-button>
        <forge-button variant="success">● Live session</forge-button>
        <forge-button variant="primary" disabled>Disabled</forge-button>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <forge-button size="sm">Small</forge-button>
        <forge-button size="md">Medium</forge-button>
        <forge-button size="lg">Large</forge-button>
      </div>
    </div>
  `,
};
