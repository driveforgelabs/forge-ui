import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-table.js';
import '../forge-badge.js';
import '../forge-chip.js';
import type { ColumnDef } from '../forge-table.js';

// ── Sample data ──────────────────────────────────────────────────────────────

interface Session {
  id: string;
  event: string;
  driver: string;
  lap: string;
  time: string;
  status: 'ok' | 'warn' | 'crit';
  delta: string;
}

const SESSIONS: Session[] = [
  { id: 'S001', event: 'Silverstone – Q',  driver: 'Hamilton', lap: '14', time: '1:39.882', status: 'ok',   delta: '—' },
  { id: 'S002', event: 'Silverstone – Q',  driver: 'Verstappen',lap: '12',time: '1:40.120',status: 'ok',   delta: '+0.238' },
  { id: 'S003', event: 'Silverstone – Q',  driver: 'Norris',   lap: '16', time: '1:40.441', status: 'warn', delta: '+0.559' },
  { id: 'S004', event: 'Silverstone – Q',  driver: 'Leclerc',  lap: '10', time: '1:40.718', status: 'ok',   delta: '+0.836' },
  { id: 'S005', event: 'Silverstone – Q',  driver: 'Russell',  lap: '15', time: '1:40.912', status: 'warn', delta: '+1.030' },
  { id: 'S006', event: 'Silverstone – Q',  driver: 'Sainz',    lap: '11', time: '1:41.205', status: 'ok',   delta: '+1.323' },
  { id: 'S007', event: 'Silverstone – Q',  driver: 'Alonso',   lap: '13', time: '1:41.607', status: 'crit', delta: '+1.725' },
  { id: 'S008', event: 'Silverstone – Q',  driver: 'Stroll',   lap: '14', time: '1:42.001', status: 'ok',   delta: '+2.119' },
  { id: 'S009', event: 'Silverstone – Q',  driver: 'Gasly',    lap: '12', time: '1:42.334', status: 'warn', delta: '+2.452' },
  { id: 'S010', event: 'Silverstone – Q',  driver: 'Ocon',     lap: '15', time: '1:42.889', status: 'crit', delta: '+3.007' },
  { id: 'S011', event: 'Monza – FP3',     driver: 'Hamilton', lap: '8',  time: '1:21.344', status: 'ok',   delta: '—' },
  { id: 'S012', event: 'Monza – FP3',     driver: 'Verstappen',lap: '7', time: '1:21.601', status: 'ok',   delta: '+0.257' },
];

const COLUMNS: ColumnDef<Session>[] = [
  { accessorKey: 'id',     header: 'ID',     size: 60 },
  { accessorKey: 'event',  header: 'Event',  size: 160 },
  { accessorKey: 'driver', header: 'Driver' },
  { accessorKey: 'lap',    header: 'Lap',    size: 60 },
  { accessorKey: 'time',   header: 'Time',   size: 100 },
  {
    accessorKey: 'delta',
    header: 'Delta',
    size: 90,
    cell: ({ getValue }) => {
      const v = getValue() as string;
      const color = v === '—' ? 'var(--fg-3)' : v.startsWith('+') ? 'var(--data-red)' : 'var(--data-green)';
      return `<span style="font-family:var(--font-mono);font-size:12px;color:${color}">${v}</span>`;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 90,
    cell: ({ getValue }) => {
      const v = getValue() as string;
      return `<forge-badge type="${v}">${v.toUpperCase()}</forge-badge>`;
    },
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-table',
  component: 'forge-table',
  tags: ['autodocs'],
  argTypes: {
    sortable: { control: 'boolean' },
    paginate: { control: 'boolean' },
    pageSize: { control: 'number' },
    loading:  { control: 'boolean' },
  },
  args: { sortable: true, paginate: false, pageSize: 10, loading: false },
  render: ({ sortable, paginate, pageSize, loading }) => html`
    <forge-table
      .columns=${COLUMNS}
      .data=${SESSIONS}
      ?sortable=${sortable}
      ?paginate=${paginate}
      page-size=${pageSize}
      ?loading=${loading}
    ></forge-table>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story    = { args: { sortable: true, paginate: false } };
export const Paginated: Story  = { args: { sortable: true, paginate: true, pageSize: 5 } };
export const Loading: Story    = { args: { loading: true } };
export const NoSort: Story     = { args: { sortable: false } };

export const Empty: Story = {
  name: 'Empty state',
  render: () => html`
    <forge-table
      .columns=${COLUMNS}
      .data=${[]}
      empty-text="No sessions found for this filter"
    ></forge-table>
  `,
};

export const FaultLog: Story = {
  name: 'Fault log table',
  render: () => {
    interface Fault {
      code: string;
      description: string;
      severity: string;
      count: number;
      first: string;
      last: string;
    }
    const faults: Fault[] = [
      { code: 'P0300', description: 'Random/multiple cylinder misfire',      severity: 'crit', count: 4,  first: '14:07:55', last: '14:09:02' },
      { code: 'P0171', description: 'System too lean — Bank 1',             severity: 'warn', count: 12, first: '14:04:12', last: '14:18:44' },
      { code: 'P0420', description: 'Catalyst system efficiency below threshold', severity: 'warn', count: 2, first: '14:22:01', last: '14:22:55' },
      { code: 'P0455', description: 'EVAP emission control system gross leak', severity: 'info', count: 1, first: '13:55:10', last: '13:55:10' },
    ];
    const cols: ColumnDef<Fault>[] = [
      { accessorKey: 'code',        header: 'Code',        size: 80 },
      { accessorKey: 'description', header: 'Description' },
      {
        accessorKey: 'severity',
        header: 'Severity',
        size: 90,
        cell: ({ getValue }) =>
          `<forge-badge type="${getValue()}">${(getValue() as string).toUpperCase()}</forge-badge>`,
      },
      { accessorKey: 'count', header: '#',    size: 50 },
      { accessorKey: 'first', header: 'First seen', size: 90 },
      { accessorKey: 'last',  header: 'Last seen',  size: 90 },
    ];
    return html`
      <forge-table .columns=${cols} .data=${faults} sortable></forge-table>
    `;
  },
};
