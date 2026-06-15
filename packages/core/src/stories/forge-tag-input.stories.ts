import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-tag-input.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-tag-input',
  component: 'forge-tag-input',
  tags: ['autodocs'],
  argTypes: {
    tags: {
      control: 'object',
      description: 'Array of tag strings',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
      table: { defaultValue: { summary: 'Add tag...' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    tags: ['V8', 'Turbocharger', 'E85'],
    placeholder: 'Add tag...',
    disabled: false,
  },
  render: ({ tags, placeholder, disabled }) => html`
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 8px;">
      <label style="font-family: var(--font-body); font-size: 13px; color: var(--fg-2);">Performance Keywords</label>
      <forge-tag-input
        .tags=${tags}
        placeholder=${placeholder}
        ?disabled=${disabled}
      ></forge-tag-input>
      <span style="font-family: var(--font-body); font-size: 11px; color: var(--fg-3);">Type a word and press Enter. Backspace removes the last tag.</span>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: {
    tags: [],
    placeholder: 'Add engine specs...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
