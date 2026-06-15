import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-dialog.js';
import '../forge-button.js';
import { ForgeDialog } from '../forge-dialog.js';

const open = (id: string) => {
  const el = document.getElementById(id) as ForgeDialog | null;
  if (el) el.open = true;
};
const close = (e: Event) => {
  const dlg = (e.target as Element).closest('forge-dialog') as ForgeDialog | null;
  if (dlg) dlg.open = false;
};

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-dialog',
  component: 'forge-dialog',
  tags: ['autodocs'],
  argTypes: {
    heading:  { control: 'text' },
    size:     { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    noClose:  { control: 'boolean' },
  },
  args: { heading: 'Session settings', size: 'md', noClose: false },
  render: ({ heading, size, noClose }) => html`
    <forge-button @click=${() => open('demo-dlg')}>Open dialog</forge-button>
    <forge-dialog
      id="demo-dlg"
      heading=${heading}
      size=${size}
      ?no-close=${noClose}
      @forge-close=${close}
    >
      <p style="color:var(--fg-2);line-height:1.6;margin:0;">
        Configure your telemetry session parameters before starting data capture.
        Changes will apply immediately to the active CAN bus streams.
      </p>
      <div slot="footer">
        <forge-button variant="ghost"   @click=${close}>Cancel</forge-button>
        <forge-button variant="primary" @click=${close}>Save changes</forge-button>
      </div>
    </forge-dialog>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = { args: { heading: 'Session settings', size: 'md' } };

export const Small: Story = {
  args: { size: 'sm', heading: 'Confirm delete' },
  render: ({ heading }) => html`
    <forge-button variant="danger" @click=${() => open('sm-dlg')}>Delete session</forge-button>
    <forge-dialog id="sm-dlg" heading=${heading} size="sm" @forge-close=${close}>
      <p style="color:var(--fg-2);margin:0;">
        This will permanently delete the session and all associated telemetry data. This cannot be undone.
      </p>
      <div slot="footer">
        <forge-button variant="ghost"   @click=${close}>Cancel</forge-button>
        <forge-button variant="danger"  @click=${close}>Delete</forge-button>
      </div>
    </forge-dialog>
  `,
};

export const Large: Story = {
  render: () => html`
    <forge-button @click=${() => open('lg-dlg')}>Open large dialog</forge-button>
    <forge-dialog id="lg-dlg" heading="Fault log export" size="lg" @forge-close=${close}>
      <p style="color:var(--fg-2);margin:0 0 12px;">
        Select the fault codes and time range to include in the export.
        Exported files will be in MDF4 format compatible with all major analysis tools.
      </p>
      <div style="display:flex;flex-direction:column;gap:8px;color:var(--fg-2);font-size:13px;">
        ${['P0300 — Random/multiple cylinder misfire', 'P0171 — System too lean (Bank 1)', 'P0420 — Catalyst system efficiency below threshold'].map(f => html`
          <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:4px;border:1px solid var(--border);">${f}</div>
        `)}
      </div>
      <div slot="footer">
        <forge-button variant="ghost"     @click=${close}>Cancel</forge-button>
        <forge-button variant="secondary" @click=${close}>Export MDF4</forge-button>
        <forge-button variant="primary"   @click=${close}>Export CSV</forge-button>
      </div>
    </forge-dialog>
  `,
};

export const NoCloseButton: Story = {
  name: 'No close (loading state)',
  render: () => html`
    <forge-button @click=${() => open('nc-dlg')}>Trigger upload</forge-button>
    <forge-dialog id="nc-dlg" heading="Uploading session data" size="sm" no-close>
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;padding:8px 0;">
        <div style="color:var(--fg-2);font-size:13px;">Transferring 142 MB to DriveForge Cloud…</div>
      </div>
    </forge-dialog>
  `,
};
