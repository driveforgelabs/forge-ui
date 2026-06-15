import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-context-menu.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-context-menu',
  component: 'forge-context-menu',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the context menu is open',
    },
    x: {
      control: 'number',
      description: 'X client coordinate',
    },
    y: {
      control: 'number',
      description: 'Y client coordinate',
    },
  },
  args: {
    open: false,
    x: 100,
    y: 100,
  },
  render: ({ open, x, y }) => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const menu = document.querySelector('forge-context-menu') as any;
      if (menu) {
        menu.x = e.clientX;
        menu.y = e.clientY;
        menu.open = true;
      }
    };

    return html`
      <div
        @contextmenu=${handleContextMenu}
        style="height: 300px; border: 2px dashed var(--border-strong); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--bg-inset); color: var(--fg-2); font-family: var(--font-body); cursor: context-menu; user-select: none;"
      >
        Right-click inside this zone to open the Context Menu
        <forge-context-menu ?open=${open} .x=${x} .y=${y}>
          <button>Edit Track</button>
          <button>Duplicate Settings</button>
          <button>Export telemetry (.csv)</button>
          <hr style="border: none; border-top: 1px solid var(--border); margin: 4px 0; width: 100%; opacity: 0.5;" />
          <button style="color: var(--data-red);">Delete Mapping</button>
        </forge-context-menu>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  args: {},
};
