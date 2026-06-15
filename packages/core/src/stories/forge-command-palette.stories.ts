import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-command-palette.js';
import '../forge-button.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-command-palette',
  component: 'forge-command-palette',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the command palette visibility state.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    open: false,
  },
  render: ({ open }) => {
    const handleSelect = (e: CustomEvent) => {
      console.log('Command selected:', e.detail);
      alert(`Selected Command: ${e.detail.name} (ID: ${e.detail.id})`);
    };

    return html`
      <div style="padding: 24px; text-align: center; border: 1px dashed var(--border-strong); border-radius: var(--radius-md); max-width: 500px; margin: 0 auto; background: var(--bg-surface);">
        <p style="font-family: var(--font-body); color: var(--fg-2); margin-bottom: 16px;">
          Press <kbd style="font-family:var(--font-mono); background:var(--bg-elevated); padding: 2px 6px; border-radius: 4px; border:1px solid var(--border-strong); color:var(--fg-1);">⌘ K</kbd> or <kbd style="font-family:var(--font-mono); background:var(--bg-elevated); padding: 2px 6px; border-radius: 4px; border:1px solid var(--border-strong); color:var(--fg-1);">Ctrl K</kbd> anywhere on this page to toggle the Command Palette.
        </p>
        <forge-button type="forge" @click="${() => {
          const cp = document.querySelector('forge-command-palette') as any;
          if (cp) cp.open = true;
        }}">
          OPEN PALETTE VIA BUTTON
        </forge-button>

        <forge-command-palette ?open=${open} @forge-select=${handleSelect}></forge-command-palette>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};
