import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-accordion.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-accordion',
  component: 'forge-accordion',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the accordion section is expanded or collapsed.',
      table: { defaultValue: { summary: 'false' } },
    },
    heading: {
      control: 'text',
      description: 'Text heading for the accordion row.',
    },
    content: {
      control: 'text',
      name: 'content (slot)',
      description: 'Content to display inside the expanded panel.',
      table: { category: 'slots' },
    },
  },
  args: {
    open: false,
    heading: 'ENGINE TELEMETRY',
    content: 'Live engine stats: Core temp 112°C, MGU-K recovery active, oil pressure stable at 4.2 bar.',
  },
  render: ({ open, heading, content }) => html`
    <forge-accordion ?open=${open} heading=${heading}>
      ${content}
    </forge-accordion>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: {
    open: false,
    heading: 'TELEMETRY CONFIGURATION',
  },
};

export const OpenByDefault: Story = {
  args: {
    open: true,
    heading: 'CHASSIS CONFIGURATION',
    content: 'Front wing angle: 12.5°, rear wing mainplane: active DRS configuration, tire pressure: 21.5 psi front / 20.0 psi rear.',
  },
};

export const MultiAccordionStack: Story = {
  name: 'Accordion Stack',
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:8px; max-width:500px;">
      <forge-accordion heading="SECTOR 1 SECTOR SPLITS" open>
        <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:13px;">
          <span>S1-01 (Turn 1-3):</span>
          <span style="color:var(--data-green);">28.452s</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:13px; margin-top:4px;">
          <span>S1-02 (Turn 4-5):</span>
          <span style="color:var(--data-purple);">14.120s (Purple)</span>
        </div>
      </forge-accordion>
      
      <forge-accordion heading="SECTOR 2 SECTOR SPLITS">
        <p style="margin:0;">Detailed sector 2 split telemetry is computed post-session for final driver telemetry overlays.</p>
      </forge-accordion>

      <forge-accordion heading="SECTOR 3 SECTOR SPLITS">
        <p style="margin:0;">Detailed sector 3 split telemetry is computed post-session for final driver telemetry overlays.</p>
      </forge-accordion>
    </div>
  `,
};
