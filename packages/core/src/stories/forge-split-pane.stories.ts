import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-split-pane.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-split-pane',
  component: 'forge-split-pane',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the split panes',
    },
    primaryMinSize: {
      control: 'number',
      name: 'primary-min-size',
      description: 'Minimum size of primary panel in pixels',
    },
    secondaryMinSize: {
      control: 'number',
      name: 'secondary-min-size',
      description: 'Minimum size of secondary panel in pixels',
    },
    split: {
      control: 'number',
      description: 'The initial split ratio (percentage)',
    },
  },
  args: {
    direction: 'horizontal',
    primaryMinSize: 100,
    secondaryMinSize: 100,
    split: 50,
  },
  render: ({ direction, primaryMinSize, secondaryMinSize, split }) => {
    return html`
      <div style="width: 100%; height: 400px; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-inset);">
        <forge-split-pane
          direction=${direction}
          primary-min-size=${primaryMinSize}
          secondary-min-size=${secondaryMinSize}
          split=${split}
        >
          <div slot="primary" style="padding: var(--space-4); height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(240, 77, 0, 0.05); color: var(--text);">
            <div style="text-align: center;">
              <h3 style="margin: 0 0 var(--space-1); font-family: var(--font-display); font-size: var(--font-size-lg); color: var(--forge);">PRIMARY PANEL</h3>
              <p style="margin: 0; font-size: var(--font-size-xs); color: var(--text-muted);">Use the drag handle to resize me.</p>
            </div>
          </div>
          <div slot="secondary" style="padding: var(--space-4); height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.02); color: var(--text);">
            <div style="text-align: center;">
              <h3 style="margin: 0 0 var(--space-1); font-family: var(--font-display); font-size: var(--font-size-lg); color: var(--fg-2);">SECONDARY PANEL</h3>
              <p style="margin: 0; font-size: var(--font-size-xs); color: var(--text-muted);">Occupies all remaining space.</p>
            </div>
          </div>
        </forge-split-pane>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
};

export const CustomMinSizes: Story = {
  args: {
    primaryMinSize: 200,
    secondaryMinSize: 200,
    split: 30,
  },
};

export const NestedLayout: Story = {
  name: 'Nested Layout (IDE-style)',
  render: () => {
    return html`
      <div style="width: 100%; height: 500px; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--bg-inset); display: flex; flex-direction: column; overflow: hidden;">
        <!-- Header -->
        <div style="height: 48px; border-bottom: 1px solid var(--border); background: var(--bg-surface); padding: 0 var(--space-4); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
          <div style="font-family: var(--font-display); font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--forge); letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg>
            DRIVEFORGE STUDIO
          </div>
          <div style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--text-muted);">
            v4.1.0
          </div>
        </div>

        <!-- Split Workspace -->
        <div style="flex-grow: 1; min-height: 0;">
          <forge-split-pane direction="horizontal" primary-min-size="150" split="20">
            <!-- Sidebar (Primary) -->
            <div slot="primary" style="height: 100%; background: var(--bg-base); display: flex; flex-direction: column;">
              <div style="padding: var(--space-3) var(--space-4); font-size: var(--font-size-xs); font-weight: var(--font-weight-bold); color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); letter-spacing: 0.05em;">
                Workspace Explorer
              </div>
              <div style="padding: var(--space-2) var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--text-muted);">
                <div style="color: var(--forge); cursor: pointer;">📁 src</div>
                <div style="padding-left: var(--space-3); cursor: pointer;">📁 components</div>
                <div style="padding-left: var(--space-3); color: var(--text); font-weight: var(--font-weight-medium); cursor: pointer;">📄 index.ts</div>
                <div style="padding-left: var(--space-3); cursor: pointer;">📄 package.json</div>
              </div>
            </div>

            <!-- Content Area (Secondary): Split vertically into Editor and Terminal -->
            <div slot="secondary" style="height: 100%;">
              <forge-split-pane direction="vertical" primary-min-size="150" split="70">
                <!-- Code Editor (Primary) -->
                <div slot="primary" style="height: 100%; background: var(--bg-surface-elevated); padding: var(--space-4); display: flex; flex-direction: column; box-sizing: border-box; justify-content: flex-start; overflow: auto;">
                  <div style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--text-muted); border-bottom: 1px solid var(--border); padding-bottom: var(--space-2); margin-bottom: var(--space-3);">
                    src/index.ts
                  </div>
                  <pre style="margin: 0; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--text); line-height: 1.5; white-space: pre-wrap;">
<span style="color: var(--forge);">import</span> { LitElement, html } <span style="color: var(--forge);">from</span> <span style="color: #22D47A;">'lit'</span>;
<span style="color: var(--forge);">import</span> { customElement } <span style="color: var(--forge);">from</span> <span style="color: #22D47A;">'lit/decorators.js'</span>;

@customElement(<span style="color: #22D47A;">'forge-app'</span>)
<span style="color: var(--forge);">export class</span> ForgeApp <span style="color: var(--forge);">extends</span> LitElement {
  render() {
    <span style="color: var(--forge);">return</span> html\`&lt;div&gt;Welcome to DriveForge&lt;/div&gt;\`;
  }
}</pre>
                </div>

                <!-- Console/Terminal (Secondary) -->
                <div slot="secondary" style="height: 100%; background: var(--bg-inset); padding: var(--space-3) var(--space-4); font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--data-green); overflow: auto; box-sizing: border-box;">
                  <div style="display: flex; gap: var(--space-2); color: var(--text-muted); border-bottom: 1px solid var(--border); padding-bottom: var(--space-2); margin-bottom: var(--space-2); text-transform: uppercase;">
                    <span>Terminal</span>
                    <span>Output</span>
                    <span>Debug Console</span>
                  </div>
                  <div>$ pnpm run typecheck</div>
                  <div style="color: var(--text-muted);">$ tsc --noEmit</div>
                  <div>[success] compilation completed without issues.</div>
                  <div style="color: var(--text);">$ _</div>
                </div>
              </forge-split-pane>
            </div>
          </forge-split-pane>
        </div>
      </div>
    `;
  },
};
