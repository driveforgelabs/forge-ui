import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-number-ticker.js';
import '../forge-button.js';
import { ForgeNumberTicker } from '../forge-number-ticker.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-number-ticker',
  component: 'forge-number-ticker',
  tags: ['autodocs'],
  argTypes: {
    value:    { control: 'number' },
    decimals: { control: 'number' },
    unit:     { control: 'text' },
    prefix:   { control: 'text' },
    duration: { control: 'number', description: 'Animation duration ms' },
  },
  args: { value: 8240, decimals: 0, unit: 'RPM', prefix: '', duration: 600 },
  render: ({ value, decimals, unit, prefix, duration }) => html`
    <forge-number-ticker
      value=${value}
      decimals=${decimals}
      unit=${unit}
      prefix=${prefix}
      duration=${duration}
      style="font-size:32px;"
    ></forge-number-ticker>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = { args: { value: 8240, unit: 'RPM', decimals: 0 } };
export const Decimal: Story = { args: { value: 1.382, unit: 's', decimals: 3, duration: 800 } };
export const Temperature: Story = { args: { value: 92, unit: '°C', decimals: 1 } };

export const LiveUpdate: Story = {
  name: 'Live update',
  render: () => {
    const values = [4200, 6800, 8100, 9400, 7200, 8900, 10200, 5600, 8240];
    let idx = 0;
    const update = () => {
      const ticker = document.querySelector<ForgeNumberTicker>('#live-ticker');
      if (ticker) ticker.value = values[idx++ % values.length];
    };
    return html`
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <forge-number-ticker id="live-ticker" value="8240" unit="RPM" style="font-size:40px;"></forge-number-ticker>
        <forge-button @click=${update}>Next value</forge-button>
      </div>
    `;
  },
};

export const LiveDashboard: Story = {
  name: 'Dashboard readout',
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;">
      ${[
        { value: 8240,  unit: 'RPM', label: 'ENGINE' },
        { value: 92,    unit: '°C',  label: 'COOLANT' },
        { value: 180,   unit: 'km/h',label: 'SPEED' },
        { value: 1.382, unit: 's',   label: 'SECTOR', decimals: 3 },
      ].map(({ value, unit, label, decimals = 0 }) => html`
        <div style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--fg-3);">${label}</span>
          <forge-number-ticker value=${value} unit=${unit} decimals=${decimals} style="font-size:28px;"></forge-number-ticker>
        </div>
      `)}
    </div>
  `,
};
