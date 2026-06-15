import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-card.js';

const INNER = html`
  <div style="font-family:var(--font-body);font-size:13px;font-weight:600;color:var(--fg-1);margin-bottom:6px;">Card title</div>
  <div style="font-size:13px;color:var(--fg-3);line-height:1.5;">
    Surface container — slot any content inside. Use <code style="font-family:var(--font-mono);font-size:11px;color:var(--fg-2);">variant</code> to switch between default, active, inset, and cluster styles.
  </div>
`;

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-card',
  component: 'forge-card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'active', 'inset', 'cluster'],
      description: 'Visual surface style',
      table: { defaultValue: { summary: 'default' } },
    },
    padding: {
      control: 'text',
      description: 'Override inner padding (CSS value)',
    },
  },
  args: { variant: 'default', padding: '' },
  render: ({ variant, padding }) => html`
    <forge-card variant=${variant} padding=${padding} style="width:280px;display:block;">
      ${INNER}
    </forge-card>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story  = { args: { variant: 'default' } };
export const Active: Story   = { args: { variant: 'active' } };
export const Inset: Story    = { args: { variant: 'inset' } };
export const Cluster: Story  = { args: { variant: 'cluster' }, parameters: { backgrounds: { default: 'cluster' } } };

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <forge-card variant="default" style="width:200px;display:block;">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--fg-3);margin-bottom:4px;letter-spacing:.08em;">DEFAULT</div>
        <div style="font-size:13px;color:var(--fg-2);">Base surface</div>
      </forge-card>
      <forge-card variant="active" style="width:200px;display:block;">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--forge);margin-bottom:4px;letter-spacing:.08em;">ACTIVE</div>
        <div style="font-size:13px;color:var(--fg-2);">Orange border + glow</div>
      </forge-card>
      <forge-card variant="inset" style="width:200px;display:block;">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--fg-3);margin-bottom:4px;letter-spacing:.08em;">INSET</div>
        <div style="font-size:13px;color:var(--fg-2);">Sunken input/data area</div>
      </forge-card>
    </div>
  `,
};
