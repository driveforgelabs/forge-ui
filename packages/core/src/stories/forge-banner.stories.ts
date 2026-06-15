import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-banner.js';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-banner',
  component: 'forge-banner',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
      description: 'The semantic style variant of the banner',
      table: { defaultValue: { summary: 'info' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button to dismiss the banner',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'info',
    dismissible: true,
  },
  render: ({ variant, dismissible }) => html`
    <forge-banner
      variant=${variant}
      ?dismissible=${dismissible}
      @forge-dismiss=${() => console.log('Banner dismissed')}
    >
      Telemetry connection interrupted. Re-establishing connection in 5 seconds...
    </forge-banner>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Info: Story = {
  args: { variant: 'info' },
};

export const Success: Story = {
  args: {
    variant: 'success',
    dismissible: false,
  },
  render: () => html`
    <forge-banner variant="success">
      ECU firmware flashed successfully. All systems nominal.
    </forge-banner>
  `,
};

export const Warning: Story = {
  args: { variant: 'warning' },
  render: () => html`
    <forge-banner variant="warning">
      Exhaust temperature exceeds 850°C. Consider adjusting air-fuel mixture ratio.
    </forge-banner>
  `,
};

export const Error: Story = {
  args: { variant: 'error' },
  render: () => html`
    <forge-banner variant="error">
      Critical sensor failure: O2 sensor disconnected on Bank 1.
    </forge-banner>
  `,
};

export const WithActions: Story = {
  name: 'With Action Buttons',
  render: () => html`
    <forge-banner variant="warning" dismissible>
      Unsaved telemetry map modifications. Save changes now?
      <div slot="actions">
        <forge-button size="sm" variant="ghost" style="--border: rgba(255,255,255,0.15)">Discard</forge-button>
        <forge-button size="sm" variant="success">Save map</forge-button>
      </div>
    </forge-banner>
  `,
};
