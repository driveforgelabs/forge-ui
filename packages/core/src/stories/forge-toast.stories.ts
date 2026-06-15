import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-toast.js';
import '../forge-button.js';
import { ForgeToast } from '../forge-toast.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-toast',
  component: 'forge-toast',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['info', 'ok', 'warn', 'crit'],
      table: { defaultValue: { summary: 'info' } },
    },
    message: {
      control: 'text',
      description: 'Notification text',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss ms (0 = manual)',
      table: { defaultValue: { summary: '4000' } },
    },
  },
  args: {
    type: 'info',
    message: 'Telemetry session saved',
    duration: 0,
  },
  render: ({ type, message, duration }) => {
    const onShow = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const toast = btn.closest('div')?.querySelector('forge-toast') as ForgeToast | null;
      toast?.show();
    };
    return html`
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
        <forge-toast type=${type} message=${message} duration=${duration}></forge-toast>
        <forge-button @click=${onShow}>Show toast</forge-button>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Info: Story = {
  args: { type: 'info', message: 'Telemetry session saved', duration: 0 },
};

export const Success: Story = {
  args: { type: 'ok', message: 'Calibration complete', duration: 0 },
};

export const Warning: Story = {
  args: { type: 'warn', message: 'Coolant temp above threshold — 92 °C', duration: 0 },
};

export const Critical: Story = {
  args: { type: 'crit', message: 'Oil pressure critical — 18 psi', duration: 0 },
};

export const AutoDismiss: Story = {
  name: 'Auto-dismiss (3s)',
  args: { type: 'ok', message: 'Lap time recorded — 1:42.381', duration: 3000 },
};

export const NotifyAPI: Story = {
  name: 'Static notify() API',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <forge-button
        variant="secondary"
        @click=${() => ForgeToast.notify('Telemetry session saved', 'info')}
      >Info</forge-button>
      <forge-button
        variant="success"
        @click=${() => ForgeToast.notify('Calibration complete', 'ok')}
      >OK</forge-button>
      <forge-button
        variant="danger"
        @click=${() => ForgeToast.notify('Oil pressure critical — 18 psi', 'crit')}
      >Critical</forge-button>
      <forge-button
        variant="ghost"
        @click=${() => ForgeToast.notify('Coolant temp above threshold', 'warn')}
      >Warn</forge-button>
    </div>
  `,
};

export const Stack: Story = {
  name: 'Stacked toasts',
  render: () => html`
    <forge-button
      @click=${() => {
        const types = ['info', 'ok', 'warn', 'crit'] as const;
        const messages = [
          'CAN frame received',
          'Lap time recorded — 1:42.381',
          'Tyre temp above operating window',
          'Brake pressure sensor fault',
        ];
        types.forEach((t, i) =>
          setTimeout(() => ForgeToast.notify(messages[i], t), i * 300)
        );
      }}
    >Fire stack</forge-button>
  `,
};
