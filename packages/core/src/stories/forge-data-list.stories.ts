import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-data-list.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-data-list',
  component: 'forge-data-list',
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation layout of key-value pairs',
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
  args: { layout: 'horizontal' },
  render: ({ layout }) => html`
    <div style="max-width: 500px; padding: 16px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md);">
      <forge-data-list layout=${layout}>
        <dt>Device ID</dt>
        <dd>DF-8834-X9</dd>
        <dt>IP Address</dt>
        <dd>192.168.1.144</dd>
        <dt>Gateway</dt>
        <dd>gw-01.us-east.driveforge.internal</dd>
        <dt>Status</dt>
        <dd>Active & Healthy</dd>
        <dt>Last Ping</dt>
        <dd>12ms ago</dd>
      </forge-data-list>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Horizontal: Story = { args: { layout: 'horizontal' } };
export const Vertical: Story = { args: { layout: 'vertical' } };

export const PaneExample: Story = {
  name: 'Telemetry Details Pane',
  render: () => html`
    <div style="max-width: 400px; padding: 24px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-lg); font-family: var(--font-body); display: flex; flex-direction: column; gap: 16px;">
      <h3 style="margin: 0; font-size: 16px; color: var(--fg-1); font-weight: 600; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Trace Properties</h3>
      
      <forge-data-list layout="horizontal">
        <dt>Trace ID</dt>
        <dd>db8f328a994c489ba1cb</dd>
        
        <dt>Span ID</dt>
        <dd>9a454e231ee72090</dd>
        
        <dt>Timestamp</dt>
        <dd>2026-03-30 14:23:11.884</dd>
        
        <dt>Service</dt>
        <dd>worker-pool-coordinator</dd>
        
        <dt>Runtime</dt>
        <dd>NodeJS v22.12.0</dd>

        <dt>Zone</dt>
        <dd>us-east-1a</dd>
      </forge-data-list>
    </div>
  `,
};
