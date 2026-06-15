import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-sparkline.js';

const RPM_TREND   = [42, 58, 55, 70, 65, 80, 78, 85, 92, 88, 95, 100, 97, 102, 98];
const TEMP_TREND  = [72, 74, 75, 77, 80, 82, 81, 84, 86, 85, 87, 90, 91, 89, 92];
const FLAT_TREND  = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
const DOWN_TREND  = [95, 90, 88, 82, 78, 72, 68, 61, 55, 48, 42, 38];
const SPIKE_TREND = [30, 32, 35, 31, 90, 88, 33, 34, 30, 31, 95, 32, 30];

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-sparkline',
  component: 'forge-sparkline',
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color', description: 'Stroke / fill color' },
    width: { control: 'number', table: { defaultValue: { summary: '80' } } },
    height: { control: 'number', table: { defaultValue: { summary: '28' } } },
    fill: { control: 'boolean', description: 'Show gradient fill area' },
    dot: { control: 'boolean', description: 'Dot on last data point' },
    strokeWidth: { control: 'number', table: { defaultValue: { summary: '1.5' } } },
  },
  args: {
    color: '#F04D00',
    width: 80,
    height: 28,
    fill: false,
    dot: false,
    strokeWidth: 1.5,
  },
  render: ({ color, width, height, fill, dot, strokeWidth }) => html`
    <forge-sparkline
      .values=${RPM_TREND}
      color=${color}
      width=${width}
      height=${height}
      ?fill=${fill}
      ?dot=${dot}
      stroke-width=${strokeWidth}
    ></forge-sparkline>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const WithFill: Story = {
  name: 'With fill',
  args: { fill: true, dot: true },
};

export const GreenUptrend: Story = {
  name: 'Green uptrend',
  render: () => html`
    <forge-sparkline
      .values=${RPM_TREND}
      color="#22D47A"
      width="80"
      height="28"
      fill
      dot
    ></forge-sparkline>
  `,
};

export const RedDowntrend: Story = {
  name: 'Red downtrend',
  render: () => html`
    <forge-sparkline
      .values=${DOWN_TREND}
      color="#E53E3E"
      width="80"
      height="28"
      fill
      dot
    ></forge-sparkline>
  `,
};

export const Spikes: Story = {
  name: 'Spike pattern',
  render: () => html`
    <forge-sparkline
      .values=${SPIKE_TREND}
      color="#F5A623"
      width="80"
      height="28"
      fill
    ></forge-sparkline>
  `,
};

export const InStatCard: Story = {
  name: 'Inline in stat rows',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:12px;color:var(--fg-1);">
      ${[
        { label: 'RPM',     values: RPM_TREND,   color: '#F04D00', val: '8,240' },
        { label: 'COOLANT', values: TEMP_TREND,  color: '#E53E3E', val: '92 °C' },
        { label: 'OIL PSI', values: DOWN_TREND,  color: '#F5A623', val: '38 psi' },
        { label: 'THROTTLE',values: SPIKE_TREND, color: '#4A9EFF', val: '76%' },
        { label: 'SPEED',   values: FLAT_TREND,  color: '#22D47A', val: '180 km/h' },
      ].map(({ label, values, color, val }) => html`
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="color:var(--fg-3);min-width:64px;letter-spacing:.08em;">${label}</span>
          <forge-sparkline .values=${values} color=${color} width="64" height="22" fill dot></forge-sparkline>
          <span style="color:var(--fg-1);min-width:60px;text-align:right;">${val}</span>
        </div>
      `)}
    </div>
  `,
};
