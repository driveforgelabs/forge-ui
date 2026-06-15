import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-alert.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-alert',
  component: 'forge-alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
      description: 'The style and icon variant for the alert',
      table: { defaultValue: { summary: 'info' } },
    },
    heading: {
      control: 'text',
      description: 'An optional bold heading displayed above the description',
    },
    body: {
      control: 'text',
      name: 'body (slot)',
      description: 'Main body content/message for the alert',
      table: { category: 'slots' },
    },
  },
  args: {
    variant: 'info',
    heading: 'Information Alert',
    body: 'This is an inline section-scoped alert message designed to bring helpful context to the user.',
  },
  render: ({ variant, heading, body }) =>
    html`<forge-alert variant=${variant} heading=${heading}>${body}</forge-alert>`,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Info: Story = {
  args: {
    variant: 'info',
    heading: 'System Update',
    body: 'A new software release is scheduled for deployment tonight at 02:00 UTC.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    heading: 'High CPU Utilization',
    body: 'Container cpu usage is exceeding 85% limits. Scaling operations initiated.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    heading: 'Connection Timed Out',
    body: 'Unable to establish secure tunnel connection with the target gateway cluster.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    heading: 'Verification Completed',
    body: 'Cryptographic identity verification completed successfully. All keys matching secure policy.',
  },
};

export const WithoutHeading: Story = {
  args: {
    variant: 'info',
    heading: '',
    body: 'Sleek, simple, and inline. No heading, just the essentials.',
  },
};

export const CustomIcon: Story = {
  name: 'Custom Icon Slot',
  render: () => html`
    <forge-alert variant="info" heading="Database Migrated">
      <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
        <path d="M3 12A9 3 0 0 0 21 12"></path>
      </svg>
      Telemetry database records successfully restructured into compressed cold storage files.
    </forge-alert>
  `,
};
