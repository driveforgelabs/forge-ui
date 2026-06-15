import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-color-swatch.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-color-swatch',
  component: 'forge-color-swatch',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Currently selected color' },
    size:  { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { value: '#F04D00', size: 'md' },
  render: ({ value, size }) => html`
    <forge-color-swatch value=${value} size=${size}></forge-color-swatch>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = { args: { value: '#F04D00', size: 'md' } };
export const Small: Story   = { args: { size: 'sm' } };
export const Large: Story   = { args: { size: 'lg' } };

export const AlertColors: Story = {
  name: 'Alert rule colors',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--fg-3);letter-spacing:.08em;">WARN COLOR</div>
      <forge-color-swatch
        .colors=${['#F04D00','#F5A623','#E53E3E','#22D47A','#4A9EFF','#A78BFA','#E2E8F0']}
        value="#F5A623"
      ></forge-color-swatch>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--fg-3);letter-spacing:.08em;">CRITICAL COLOR</div>
      <forge-color-swatch
        .colors=${['#F04D00','#F5A623','#E53E3E','#22D47A','#4A9EFF','#A78BFA','#E2E8F0']}
        value="#E53E3E"
      ></forge-color-swatch>
    </div>
  `,
};
