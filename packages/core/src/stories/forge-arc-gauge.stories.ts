import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-arc-gauge.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-arc-gauge',
  component: 'forge-arc-gauge',
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'cluster' } },
  argTypes: {
    value:   { control: { type: 'range', min: 0, max: 8000, step: 100 }, description: 'Current reading' },
    min:     { control: 'number', description: 'Minimum value' },
    max:     { control: 'number', description: 'Maximum value' },
    display: { control: 'text', description: 'Formatted readout string (overrides value display)' },
    tone:    { control: 'select', options: ['forge', 'green', 'amber', 'blue', 'red'], description: 'Colour tone' },
    color:   { control: 'color', description: 'Raw CSS colour override' },
    redline: { control: { type: 'range', min: 0, max: 1, step: 0.05 }, description: 'Fraction where red zone starts' },
    label:   { control: 'text', description: 'Label below gauge' },
    unit:    { control: 'text', description: 'Unit abbreviation (e.g. RPM)' },
    size:    { control: { type: 'range', min: 80, max: 280, step: 10 }, description: 'SVG size in px' },
  },
  args: {
    value: 4820,
    min: 0,
    max: 8000,
    tone: 'forge',
    redline: 0.88,
    label: 'Engine Speed',
    unit: 'RPM',
    size: 160,
  },
  render: ({ value, min, max, display, tone, color, redline, label, unit, size }) => html`
    <forge-arc-gauge
      value=${value}
      min=${min}
      max=${max}
      display=${display ?? ''}
      tone=${tone}
      color=${color ?? ''}
      redline=${redline}
      label=${label}
      unit=${unit}
      size=${size}
    ></forge-arc-gauge>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const RPM: Story = {
  args: { value: 4820, max: 8000, tone: 'forge', redline: 0.88, label: 'Engine Speed', unit: 'RPM' },
};

export const Speed: Story = {
  args: { value: 147, max: 250, tone: 'blue', redline: 0, label: 'Vehicle Speed', unit: 'km/h' },
};

export const CoolantTemp: Story = {
  name: 'Coolant temp',
  args: { value: 91, max: 120, tone: 'amber', redline: 0.9, label: 'Coolant Temp', unit: '°C' },
};

export const InRedZone: Story = {
  name: 'In red zone',
  args: { value: 7400, max: 8000, tone: 'forge', redline: 0.88, label: 'Engine Speed', unit: 'RPM' },
};

export const Sizes: Story = {
  name: 'Size variants',
  render: () => html`
    <div style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap;">
      ${[80, 120, 160, 200].map(
        (s) => html`
          <forge-arc-gauge
            value="4820" max="8000" tone="forge" redline="0.88"
            label="ENGINE" unit="RPM" size=${s}
          ></forge-arc-gauge>
        `
      )}
    </div>
  `,
};

export const ClusterRow: Story = {
  name: 'Cluster row',
  render: () => html`
    <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;">
      <forge-arc-gauge value="4820" max="8000" tone="forge"  redline="0.88" label="Engine Speed"  unit="RPM"  size="140"></forge-arc-gauge>
      <forge-arc-gauge value="147"  max="250"  tone="blue"                  label="Vehicle Speed" unit="km/h" size="140"></forge-arc-gauge>
      <forge-arc-gauge value="91"   max="120"  tone="amber"  redline="0.9"  label="Coolant Temp"  unit="°C"   size="140"></forge-arc-gauge>
      <forge-arc-gauge value="0.8"  min="0"    max="1.2"     tone="green"                         label="Lambda λ"    unit=""     size="140"></forge-arc-gauge>
    </div>
  `,
};

export const Animated: Story = {
  name: 'Animated (live sim)',
  args: { max: 8000, tone: 'forge', redline: 0.88, label: 'Engine Speed', unit: 'RPM', size: 180 },
  render: ({ max, tone, redline, label, unit, size }) => html`
    <forge-arc-gauge
      id="gauge-live"
      value="0"
      max=${max}
      tone=${tone}
      redline=${redline}
      label=${label}
      unit=${unit}
      size=${size}
    ></forge-arc-gauge>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-arc-gauge');
    const el = canvasElement.querySelector('#gauge-live');
    if (!el) return;
    let t = 0;
    const tick = () => {
      t += 0.018;
      const v = Math.round(1200 + 5200 * (0.5 + 0.5 * Math.sin(t * 0.7)));
      el.setAttribute('value', String(v));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
};
