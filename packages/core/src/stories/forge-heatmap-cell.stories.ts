import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-heatmap-cell.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-heatmap-cell',
  component: 'forge-heatmap-cell',
  tags: ['autodocs'],
  argTypes: {
    value:     { control: 'range', min: 0, max: 1, step: 0.01 },
    highColor: { control: 'color' },
    size:      { control: 'number' },
    radius:    { control: 'number' },
    label:     { control: 'text' },
  },
  args: { value: 0.7, highColor: '#F04D00', size: 16, radius: 2, label: '' },
  render: ({ value, highColor, size, radius, label }) => html`
    <forge-heatmap-cell
      value=${value}
      high-color=${highColor}
      size=${size}
      radius=${radius}
      label=${label}
    ></forge-heatmap-cell>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = { args: { value: 0.7 } };

export const TyreTemperatureGrid: Story = {
  name: 'Tyre temperature grid',
  render: () => {
    const corners = [
      [0.55, 0.72, 0.80, 0.65, 0.45],
      [0.60, 0.78, 0.91, 0.70, 0.50],
      [0.48, 0.65, 0.75, 0.60, 0.40],
      [0.52, 0.70, 0.85, 0.68, 0.44],
    ];
    const labels = ['FL', 'FR', 'RL', 'RR'];
    return html`
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${corners.map((row, ri) => html`
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-family:var(--font-mono);font-size:9px;color:var(--fg-3);min-width:20px;">${labels[ri]}</span>
            <div style="display:flex;gap:3px;">
              ${row.map(v => html`
                <forge-heatmap-cell
                  value=${v}
                  high-color="#E53E3E"
                  low-color="rgba(34,212,122,0.15)"
                  size="20"
                  radius="3"
                  label="${(v * 120 + 50).toFixed(0)}°C"
                ></forge-heatmap-cell>
              `)}
            </div>
            <span style="font-family:var(--font-mono);font-size:10px;color:var(--fg-2);">${(Math.max(...row) * 120 + 50).toFixed(0)}°C</span>
          </div>
        `)}
      </div>
    `;
  },
};

export const ActivityGrid: Story = {
  name: 'Activity grid (GitHub style)',
  render: () => {
    const weeks = 16;
    const days  = 7;
    const data  = Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.random() < 0.6 ? Math.random() : 0)
    );
    return html`
      <div style="display:flex;gap:3px;">
        ${data.map(week => html`
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${week.map(v => html`
              <forge-heatmap-cell value=${v} high-color="#22D47A" size="12" radius="2"></forge-heatmap-cell>
            `)}
          </div>
        `)}
      </div>
    `;
  },
};
