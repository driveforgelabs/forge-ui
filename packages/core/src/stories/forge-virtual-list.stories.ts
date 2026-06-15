import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-virtual-list.js';

// Generate 10,000 highly realistic telemetry logs
const generateLogs = (count = 10000) => {
  return Array.from({ length: count }, (_, i) => {
    const level = i % 500 === 0 ? 'CRIT' : i % 50 === 0 ? 'WARN' : 'INFO';
    return {
      id: `TR-${100000 + i}`,
      timestamp: new Date(Date.now() - i * 100).toISOString().substring(11, 23),
      level,
      latency: `${(Math.random() * 200 + 5).toFixed(1)}ms`,
      service: ['auth-service', 'gateway-api', 'telemetry-db', 'worker-pool'][i % 4],
    };
  });
};

const defaultItems = generateLogs(10000);

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-virtual-list',
  component: 'forge-virtual-list',
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'The array of data items to virtualize (renders over 10k items smoothly)',
    },
    itemHeight: {
      name: 'item-height',
      control: 'number',
      description: 'Height of each row in pixels',
      table: { defaultValue: { summary: '40' } },
    },
    buffer: {
      control: 'number',
      description: 'Extra items rendered offscreen to prevent scroll flickering',
      table: { defaultValue: { summary: '5' } },
    },
  },
  args: {
    items: defaultItems,
    itemHeight: 40,
    buffer: 5,
  },
  render: ({ items, itemHeight, buffer }) => html`
    <div style="height: 300px; max-width: 800px; width: 100%;">
      <forge-virtual-list
        .items=${items}
        item-height=${itemHeight}
        buffer=${buffer}
      ></forge-virtual-list>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const DefaultTelemetryList: Story = {};

export const StringsList: Story = {
  name: 'List of Simple Strings',
  args: {
    items: Array.from({ length: 5000 }, (_, i) => `Log record line item #${i + 1} with diagnostics`),
    itemHeight: 32,
  },
  render: ({ items, itemHeight }) => html`
    <div style="height: 250px; max-width: 600px; width: 100%;">
      <forge-virtual-list
        .items=${items}
        item-height=${itemHeight}
      ></forge-virtual-list>
    </div>
  `,
};

export const CustomTemplate: Story = {
  name: 'Custom Row Template',
  render: ({ itemHeight, buffer }) => {
    // Custom cell rendering function
    const customRenderer = (item: any, index: number) => {
      const getBadgeStyle = (lvl: string) => {
        if (lvl === 'CRIT') return 'background: var(--data-red-dim); color: var(--data-red);';
        if (lvl === 'WARN') return 'background: var(--data-amber-dim); color: var(--data-amber);';
        return 'background: var(--data-blue-dim); color: var(--data-blue);';
      };

      return html`
        <div style="display: flex; align-items: center; width: 100%; font-family: var(--font-mono); font-size: 12px; gap: 16px;">
          <span style="color: var(--fg-3); font-weight: 500; min-width: 45px;">#${index}</span>
          <span style="color: var(--fg-2); min-width: 90px;">${item.timestamp}</span>
          <span style="font-weight: 600; padding: 2px 6px; border-radius: 4px; font-size: 10px; min-width: 40px; text-align: center; ${getBadgeStyle(item.level)}">${item.level}</span>
          <span style="color: var(--forge); min-width: 100px;">${item.service}</span>
          <span style="color: var(--fg-1); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">API process query latency alert</span>
          <span style="color: var(--fg-2); font-weight: 600;">${item.latency}</span>
        </div>
      `;
    };

    return html`
      <div style="height: 350px; max-width: 850px; width: 100%;">
        <forge-virtual-list
          .items=${defaultItems}
          item-height=${itemHeight}
          buffer=${buffer}
          .renderItem=${customRenderer}
        ></forge-virtual-list>
      </div>
    `;
  },
};
