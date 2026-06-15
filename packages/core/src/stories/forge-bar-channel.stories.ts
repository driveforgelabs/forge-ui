import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-bar-channel.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-bar-channel',
  component: 'forge-bar-channel',
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'cluster' } },
  argTypes: {
    label: { control: 'text', description: 'Channel name (displayed uppercase)' },
    value: { control: 'text', description: 'Displayed value' },
    pct:   { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: 'Fill 0–1 (takes priority over value/max)' },
    unit:  { control: 'text', description: 'Unit abbreviation' },
    color: { control: 'color', description: 'Bar and value colour' },
  },
  args: {
    label: 'Throttle',
    value: '78',
    pct: 0.78,
    unit: '%',
    color: '#F04D00',
  },
  render: ({ label, value, pct, unit, color }) => html`
    <forge-bar-channel
      style="width:240px;display:block;"
      label=${label}
      value=${value}
      pct=${pct}
      unit=${unit}
      color=${color}
    ></forge-bar-channel>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Throttle: Story = {
  args: { label: 'Throttle', value: '78', pct: 0.78, unit: '%', color: '#F04D00' },
};

export const Lambda: Story = {
  args: { label: 'Lambda λ', value: '0.997', pct: 0.50, unit: '', color: '#22D47A' },
};

export const Fuel: Story = {
  args: { label: 'Fuel', value: '31', pct: 0.31, unit: '%', color: '#F5A623' },
};

export const ClusterChannels: Story = {
  name: 'Cluster channels',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;width:220px;">
      <forge-bar-channel label="Throttle"  value="78"    pct="0.78" unit="%"    color="#F04D00"></forge-bar-channel>
      <forge-bar-channel label="Lambda λ"  value="0.997" pct="0.50"             color="#22D47A"></forge-bar-channel>
      <forge-bar-channel label="MAP kPa"   value="98"    pct="0.65" unit=" kPa" color="#4A9EFF"></forge-bar-channel>
      <forge-bar-channel label="Knock"     value="0.0"   pct="0.02" unit=" dB"  color="#22D47A"></forge-bar-channel>
      <forge-bar-channel label="Fuel"      value="31"    pct="0.31" unit="%"    color="#F5A623"></forge-bar-channel>
    </div>
  `,
};

export const Animated: Story = {
  name: 'Animated (live sim)',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;width:220px;">
      <forge-bar-channel id="bc-tps"   label="Throttle" value="0"     unit="%"    color="#F04D00" pct="0"></forge-bar-channel>
      <forge-bar-channel id="bc-boost" label="Boost"    value="0"     unit=" kPa" color="#4A9EFF" pct="0"></forge-bar-channel>
      <forge-bar-channel id="bc-afr"   label="AFR"      value="14.70"             color="#22D47A" pct="0.5"></forge-bar-channel>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-bar-channel');
    const tps   = canvasElement.querySelector('#bc-tps')   as HTMLElement | null;
    const boost = canvasElement.querySelector('#bc-boost') as HTMLElement | null;
    const afr   = canvasElement.querySelector('#bc-afr')   as HTMLElement | null;
    if (!tps) return;
    let t = 0;
    const tick = () => {
      t += 0.02;
      const tpsV  = Math.round(20 + 75 * (0.5 + 0.5 * Math.sin(t * 1.1)));
      const boostV = Math.round(50 + 90 * (0.5 + 0.5 * Math.sin(t * 0.9)));
      const afrV  = (14.7 - 2 * Math.sin(t * 1.3)).toFixed(2);
      tps.setAttribute('value', String(tpsV));   tps.setAttribute('pct', String(tpsV / 100));
      boost?.setAttribute('value', String(boostV)); boost?.setAttribute('pct', String(boostV / 200));
      afr?.setAttribute('value', afrV); afr?.setAttribute('pct', String((tpsV / 100) * 0.65 + 0.18));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
};
