import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { MetaItem } from '../forge-stat-card.js';
import '../forge-stat-card.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-stat-card',
  component: 'forge-stat-card',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text', description: 'Card title' },
    sub:         { control: 'text', description: 'Subtitle / sensor source' },
    value:       { control: 'text', description: 'Main reading value' },
    unit:        { control: 'text', description: 'Unit (shown smaller after value)' },
    valueColor:  { control: 'color', description: 'CSS colour for the main value' },
    bar:         { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Bar fill 0–100 (omit to hide)' },
    barColor:    { control: 'color' },
    badge:       { control: 'text' },
    badgeType:   { control: 'select', options: ['ok', 'warn', 'crit', 'info', 'forge', 'muted'] },
    delta:       { control: 'text', description: 'Delta value (e.g. −0.8s)' },
    state:       { control: 'inline-radio', options: ['default', 'active', 'warn', 'crit', 'ok'] },
  },
  args: {
    label: 'Coolant temp',
    sub: 'Engine block sensor',
    value: '91',
    unit: ' °C',
    bar: 72,
    barColor: 'var(--data-amber)',
    badge: 'WARN',
    badgeType: 'warn',
    state: 'default',
  },
  render: ({ label, sub, value, unit, valueColor, bar, barColor, badge, badgeType, delta, state }) => html`
    <forge-stat-card
      id="story-stat"
      style="width:280px;display:block;"
      label=${label}
      sub=${sub}
      value=${value}
      unit=${unit}
      value-color=${valueColor ?? ''}
      bar=${bar}
      bar-color=${barColor}
      badge=${badge}
      badge-type=${badgeType}
      delta=${delta ?? ''}
      state=${state}
    ></forge-stat-card>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-stat-card');
    const el = canvasElement.querySelector('#story-stat') as any;
    if (el) {
      el.meta = [
        { label: 'Min',   value: '68°C' },
        { label: 'Max',   value: '105°C' },
        { label: 'Limit', value: '110°C' },
      ] satisfies MetaItem[];
    }
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Warning: Story = {
  args: {
    label: 'Coolant temp', sub: 'Engine block sensor',
    value: '91', unit: ' °C', bar: 72, barColor: 'var(--data-amber)',
    badge: 'WARN', badgeType: 'warn', state: 'default',
  },
};

export const ActiveMap: Story = {
  name: 'Active — Stage 2 map',
  render: () => html`
    <forge-stat-card
      id="story-map"
      style="width:280px;display:block;"
      label="Stage 2 map"
      sub="Last flashed 2h ago"
      badge="ACTIVE"
      badge-type="forge"
      state="active"
    >
      <div slot="inset" style="background:var(--bg-inset);border-radius:4px;padding:10px 12px;margin-top:8px;">
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--fg-3);">Base timing</div>
        <div style="font-family:var(--font-mono);font-size:20px;color:var(--forge);font-weight:300;">
          +4.5°<span style="font-size:11px;color:var(--fg-3);"> advance</span>
        </div>
      </div>
    </forge-stat-card>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-stat-card');
    const el = canvasElement.querySelector('#story-map') as any;
    if (el) el.meta = [
      { label: 'Fueling', value: '+2.1%' },
      { label: 'Rev lim', value: '7,200' },
      { label: 'Map',     value: '91oct' },
    ] satisfies MetaItem[];
  },
};

export const LiveSession: Story = {
  name: 'Live — session log',
  render: () => html`
    <forge-stat-card
      id="story-session"
      style="width:280px;display:block;"
      label="Session log"
      sub="Portimão — Turn 3"
      value="214"
      unit=" km/h"
      value-color="var(--data-green)"
      badge="LIVE"
      badge-type="ok"
      bar="85"
      bar-color="var(--data-green)"
      delta="−0.8s"
    ></forge-stat-card>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-stat-card');
    const el = canvasElement.querySelector('#story-session') as any;
    if (el) el.meta = [
      { label: 'Lap',  value: '4 / 12' },
      { label: 'Best', value: '1:42.3' },
      { label: 'Δ',    value: '−0.8s', color: 'var(--data-green)' },
    ] satisfies MetaItem[];
  },
};

export const ThreeUp: Story = {
  name: 'Three-up grid',
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:860px;">
      <forge-stat-card
        id="stat-a" label="Coolant temp" sub="Block sensor"
        value="91" unit=" °C" badge="WARN" badge-type="warn" bar="72" bar-color="var(--data-amber)"
      ></forge-stat-card>
      <forge-stat-card
        id="stat-b" label="Stage 2 map" sub="Last flashed 2h ago"
        badge="ACTIVE" badge-type="forge" state="active"
      >
        <div slot="inset" style="background:var(--bg-inset);border-radius:4px;padding:10px 12px;margin-top:8px;">
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--fg-3);">Base timing</div>
          <div style="font-family:var(--font-mono);font-size:20px;color:var(--forge);font-weight:300;">+4.5°<span style="font-size:11px;color:var(--fg-3);"> advance</span></div>
        </div>
      </forge-stat-card>
      <forge-stat-card
        id="stat-c" label="Session log" sub="Portimão — Turn 3"
        value="214" unit=" km/h" value-color="var(--data-green)"
        badge="LIVE" badge-type="ok" bar="85" bar-color="var(--data-green)" delta="−0.8s"
      ></forge-stat-card>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('forge-stat-card');
    const a = canvasElement.querySelector('#stat-a') as any;
    const b = canvasElement.querySelector('#stat-b') as any;
    const c = canvasElement.querySelector('#stat-c') as any;
    if (a) a.meta = [{ label: 'Min', value: '68°C' }, { label: 'Max', value: '105°C' }, { label: 'Limit', value: '110°C' }];
    if (b) b.meta = [{ label: 'Fueling', value: '+2.1%' }, { label: 'Rev lim', value: '7,200' }, { label: 'Map', value: '91oct' }];
    if (c) c.meta = [{ label: 'Lap', value: '4 / 12' }, { label: 'Best', value: '1:42.3' }, { label: 'Δ', value: '−0.8s', color: 'var(--data-green)' }];
  },
  parameters: { layout: 'fullscreen' },
};
