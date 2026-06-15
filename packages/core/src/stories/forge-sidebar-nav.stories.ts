import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-sidebar-nav.js';

const ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: '⬡' },
  { id: 'sessions',  label: 'Sessions',   icon: '◎', badge: 3 },
  { id: 'telemetry', label: 'Telemetry',  icon: '⟁' },
  { id: 'faults',    label: 'Fault codes',icon: '△', badge: 12 },
  { id: 'maps',      label: 'Track maps', icon: '◫' },
  { id: 'settings',  label: 'Settings',   icon: '⚙', disabled: true },
];

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-sidebar-nav',
  component: 'forge-sidebar-nav',
  tags: ['autodocs'],
  argTypes: {
    selected:  { control: 'text' },
    collapsed: { control: 'boolean' },
    brand:     { control: 'text' },
  },
  args: { selected: 'dashboard', collapsed: false, brand: 'DriveForge' },
  render: ({ selected, collapsed, brand }) => html`
    <div style="height:400px;display:flex;border:1px solid var(--border);border-radius:8px;overflow:hidden;">
      <forge-sidebar-nav
        .items=${ITEMS}
        selected=${selected}
        ?collapsed=${collapsed}
        brand=${brand}
      ></forge-sidebar-nav>
      <div style="flex:1;padding:24px;color:var(--fg-2);font-family:var(--font-body);font-size:13px;">
        Main content area
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Expanded: Story  = { args: { selected: 'sessions',  collapsed: false } };
export const Collapsed: Story = { args: { selected: 'telemetry', collapsed: true } };

export const WithNested: Story = {
  name: 'With nested children',
  render: () => html`
    <div style="height:500px;display:flex;border:1px solid var(--border);border-radius:8px;overflow:hidden;">
      <forge-sidebar-nav
        .items=${[
          { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
          {
            id: 'sessions', label: 'Sessions', icon: '◎',
            children: [
              { id: 'sessions-live',   label: 'Live session' },
              { id: 'sessions-replay', label: 'Replay' },
              { id: 'sessions-export', label: 'Export' },
            ],
          },
          { id: 'faults', label: 'Faults', icon: '△', badge: 5 },
          { id: 'settings', label: 'Settings', icon: '⚙' },
        ]}
        selected="sessions-live"
      ></forge-sidebar-nav>
      <div style="flex:1;padding:24px;color:var(--fg-2);font-size:13px;">Live session view</div>
    </div>
  `,
};
