import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-file-upload.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-file-upload',
  component: 'forge-file-upload',
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types/extensions (e.g. ".png,image/*,application/pdf")',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files are allowed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload zone is disabled',
    },
  },
  args: {
    accept: '',
    multiple: false,
    disabled: false,
  },
  render: ({ accept, multiple, disabled }) => {
    const handleSelect = (e: CustomEvent<{ files: File[] }>) => {
      const files = e.detail.files;
      const listContainer = document.getElementById('selected-files-list');
      if (listContainer) {
        listContainer.innerHTML = files
          .map(
            (file) =>
              `<div style="display: flex; justify-content: space-between; padding: 4px var(--space-2); background: var(--bg-surface-elevated); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--font-size-xs);">
                <span>${file.name}</span>
                <span style="color: var(--text-muted);">${(file.size / 1024).toFixed(1)} KB</span>
              </div>`
          )
          .join('');
      }
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: var(--space-4); max-width: 500px;">
        <forge-file-upload
          accept=${accept || ''}
          ?multiple=${multiple}
          ?disabled=${disabled}
          @forge-file-select=${handleSelect}
        >
          <div style="display: flex; flex-direction: column; align-items: center; gap: var(--space-2);">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              stroke="var(--forge)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="margin-bottom: var(--space-2);"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div style="font-weight: var(--font-weight-medium); color: var(--text);">
              Drag & drop files here or <span style="color: var(--forge); text-decoration: underline;">browse</span>
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
              ${accept ? `Supports: ${accept}` : 'Any file format supported'}
            </div>
          </div>
        </forge-file-upload>

        <div style="display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Selected Files:
          </div>
          <div id="selected-files-list" style="display: flex; flex-direction: column; gap: 6px; min-height: 40px; border: 1px dashed var(--border); border-radius: var(--radius-md); padding: var(--space-2); background: var(--bg-surface);">
            <div style="color: var(--text-muted); font-size: var(--font-size-xs); font-style: italic; text-align: center; line-height: 40px;">
              No files selected yet
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
