import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-divider.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-divider',
  component: 'forge-divider',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    strength:    { control: 'inline-radio', options: ['subtle', 'default', 'strong'] },
  },
  args: { label: '', orientation: 'horizontal', strength: 'default' },
  render: ({ label, orientation, strength }) => html`
    <forge-divider label=${label} orientation=${orientation} strength=${strength}></forge-divider>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Plain: Story  = { args: { label: '' } };
export const Labelled: Story = { args: { label: 'ENGINE DATA' } };
export const Subtle: Story   = { args: { strength: 'subtle' } };
export const Strong: Story   = { args: { strength: 'strong', label: 'SECTION' } };

export const InForm: Story = {
  name: 'In form layout',
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:16px;color:var(--fg-1);font-family:var(--font-body);font-size:14px;">
      <div>Session name</div>
      <forge-divider label="SENSORS"></forge-divider>
      <div>CAN bus configuration</div>
      <div>GPS module</div>
      <forge-divider label="ALERTS"></forge-divider>
      <div>Threshold settings</div>
      <forge-divider strength="subtle"></forge-divider>
      <div style="color:var(--fg-3);font-size:12px;">Last modified 2 minutes ago</div>
    </div>
  `,
};
