import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-empty-state.js';
import '../forge-button.js'; // Assuming we have forge-button to demo slots

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-empty-state',
  component: 'forge-empty-state',
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'The main heading display.',
    },
    description: {
      control: 'text',
      description: 'An informative body text supporting the empty state.',
    },
    actions: {
      control: 'text',
      name: 'default (slot)',
      description: 'The primary actions area at the bottom.',
      table: { category: 'slots' },
    },
    icon: {
      control: 'text',
      name: 'icon (slot)',
      description: 'Optional replacement of the default fallback icon.',
      table: { category: 'slots' },
    },
  },
  args: {
    heading: 'NO ACTIVE TELEMETRY SESSIONS',
    description: 'Connect a telemetry stream or load an offline telemetry recording to start analyzing performance metrics.',
  },
  render: ({ heading, description }) => html`
    <forge-empty-state heading=${heading} description=${description}>
      <forge-button type="forge">CONNECT STREAM</forge-button>
      <forge-button style="--bg-inset: var(--bg-elevated);">UPLOAD LOG</forge-button>
    </forge-empty-state>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const CustomIcon: Story = {
  name: 'Custom Icon',
  render: () => html`
    <forge-empty-state
      heading="DRS SECTOR MAP NOT LOADED"
      description="The DRS activation map for this track layout has not been uploaded. Upload a standard FIA map to enable active sector analysis."
    >
      <svg
        slot="icon"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--forge)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <forge-button type="forge">LOAD FIA DRS MAP</forge-button>
    </forge-empty-state>
  `,
};
