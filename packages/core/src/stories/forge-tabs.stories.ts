import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-tabs.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-tabs',
  component: 'forge-tabs',
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'text',
      description: 'Id of the currently selected tab',
    },
  },
  args: { selected: 'overview' },
  render: ({ selected }) => html`
    <forge-tabs
      .tabs=${[
        { id: 'overview', label: 'Overview' },
        { id: 'telemetry', label: 'Telemetry' },
        { id: 'faults', label: 'Faults' },
        { id: 'logs', label: 'Logs' },
      ]}
      selected=${selected}
    ></forge-tabs>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: { selected: 'overview' },
};

export const WithBadges: Story = {
  name: 'With badges',
  render: () => html`
    <forge-tabs
      .tabs=${[
        { id: 'overview', label: 'Overview' },
        { id: 'faults', label: 'Faults', badge: 3 },
        { id: 'logs', label: 'Logs', badge: 128 },
        { id: 'settings', label: 'Settings' },
      ]}
      selected="faults"
    ></forge-tabs>
  `,
};

export const WithDisabled: Story = {
  name: 'With disabled tab',
  render: () => html`
    <forge-tabs
      .tabs=${[
        { id: 'live', label: 'Live' },
        { id: 'replay', label: 'Replay', disabled: true },
        { id: 'export', label: 'Export' },
      ]}
      selected="live"
    ></forge-tabs>
  `,
};

export const WithPanels: Story = {
  name: 'With panel content',
  render: () => {
    const tabs = [
      { id: 'engine', label: 'Engine' },
      { id: 'brakes', label: 'Brakes' },
      { id: 'suspension', label: 'Suspension' },
    ];

    return html`
      <forge-tabs
        .tabs=${tabs}
        selected="engine"
        @forge-tab-change=${(e: CustomEvent) => {
          const panels = document.querySelectorAll<HTMLElement>('.demo-panel');
          panels.forEach(p => {
            p.style.display = p.dataset.tab === e.detail.id ? 'block' : 'none';
          });
        }}
      >
        <div style="padding:16px;color:var(--fg-2);font-size:13px;">
          <div class="demo-panel" data-tab="engine" style="display:block;">
            Engine diagnostics — RPM, coolant temp, oil pressure
          </div>
          <div class="demo-panel" data-tab="brakes" style="display:none;">
            Brake system — pad wear, bias, pedal travel
          </div>
          <div class="demo-panel" data-tab="suspension" style="display:none;">
            Suspension — ride height, damper data, corner weights
          </div>
        </div>
      </forge-tabs>
    `;
  },
};
