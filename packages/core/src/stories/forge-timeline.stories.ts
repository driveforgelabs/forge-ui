import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-timeline.js';

const SESSION_EVENTS = [
  { time: '14:02:01', label: 'Session started',         type: 'forge',  description: 'CAN bus connected, GPS locked' },
  { time: '14:02:45', label: 'Lap 1 begin',             type: 'info' },
  { time: '14:04:12', label: 'P0171 — Lean mixture',   type: 'warn',  description: 'Bank 1 fuel trim at +18%' },
  { time: '14:05:38', label: 'Lap 1 complete',          type: 'ok',    description: '1:42.381' },
  { time: '14:05:38', label: 'Lap 2 begin',             type: 'info' },
  { time: '14:07:55', label: 'P0300 — Misfire detected',type: 'crit', description: 'Cylinders 2, 4 affected' },
  { time: '14:09:02', label: 'Session ended',           type: 'muted', description: 'Driver abort' },
];

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-timeline',
  component: 'forge-timeline',
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
  args: { orientation: 'vertical' },
  render: ({ orientation }) => html`
    <forge-timeline
      .events=${SESSION_EVENTS}
      orientation=${orientation}
    ></forge-timeline>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Vertical: Story   = { args: { orientation: 'vertical' } };
export const Horizontal: Story = { args: { orientation: 'horizontal' } };

export const FaultOnly: Story = {
  name: 'Fault log',
  render: () => html`
    <forge-timeline
      .events=${[
        { time: '14:04:12', label: 'P0171 — Lean mixture',    type: 'warn',  description: 'Bank 1 fuel trim +18%' },
        { time: '14:07:55', label: 'P0300 — Misfire',         type: 'crit',  description: 'Cylinders 2, 4 affected' },
        { time: '14:12:30', label: 'P0420 — Catalyst below threshold', type: 'warn', description: 'Bank 1 efficiency 71%' },
        { time: '14:15:01', label: 'P0300 cleared',           type: 'ok',    description: 'ECU reset acknowledged' },
      ]}
    ></forge-timeline>
  `,
};

export const LapMarkers: Story = {
  name: 'Lap markers (horizontal)',
  render: () => html`
    <forge-timeline
      .events=${[
        { time: 'OUT LAP', label: '2:01.444', type: 'muted' },
        { time: 'LAP 1',   label: '1:42.381', type: 'forge' },
        { time: 'LAP 2',   label: '1:41.997', type: 'ok' },
        { time: 'LAP 3',   label: '1:43.210', type: 'info' },
        { time: 'LAP 4',   label: '1:39.882', type: 'ok' },
        { time: 'IN LAP',  label: '2:05.111', type: 'muted' },
      ]}
      orientation="horizontal"
    ></forge-timeline>
  `,
};
