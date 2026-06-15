import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-scroll-area.js';
import '../forge-badge.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-scroll-area',
  component: 'forge-scroll-area',
  tags: ['autodocs'],
  argTypes: {
    scrollbarVisibility: {
      control: 'select',
      options: ['auto', 'always', 'hover'],
      name: 'scrollbar-visibility',
      description: 'Determines when the scrollbars are visible',
      table: { defaultValue: { summary: 'hover' } },
    },
  },
  args: {
    scrollbarVisibility: 'hover',
  },
  render: ({ scrollbarVisibility }) => {
    const mockData = Array.from({ length: 25 }, (_, i) => ({
      timestamp: `14:32:${String(i).padStart(2, '0')}`,
      level: i % 5 === 0 ? 'crit' : i % 3 === 0 ? 'warn' : 'info',
      message: [
        'Database connection pool saturated, re-allocating nodes...',
        'Compiling assets for package @forge-ui/core...',
        'Garbage collection completed. Liberated 142MB heap memory.',
        'Ping latency spike: router-us-east-1.driveforge.net (42ms).',
        'Incoming OAuth handshake verified successfully for user developer@driveforge.com.',
      ][i % 5],
    }));

    return html`
      <div style="width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Scroll Container Wrapper -->
        <div style="height: 300px; border: 1px solid var(--border-strong); border-radius: var(--radius-lg); background: var(--bg-inset); overflow: hidden; display: flex; flex-direction: column;">
          
          <!-- Sticky Header inside Wrapper -->
          <div style="background: var(--bg-surface); padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; z-index: 5;">
            <div style="font-family: var(--font-display); font-size: var(--font-size-md); font-weight: var(--font-weight-bold); letter-spacing: 0.05em; color: var(--forge);">
              LIVE EVENT TELEMETRY
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); font-family: var(--font-mono);">
              25 nodes monitored
            </div>
          </div>

          <forge-scroll-area scrollbar-visibility=${scrollbarVisibility}>
            <div style="padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
              ${mockData.map(
                (item) => html`
                  <div style="display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-2); background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--font-size-xs);">
                    <span style="color: var(--text-muted);">${item.timestamp}</span>
                    <forge-badge type=${item.level === 'crit' ? 'crit' : item.level === 'warn' ? 'warn' : 'info'}>
                      ${item.level}
                    </forge-badge>
                    <span style="color: var(--text); word-break: break-all;">${item.message}</span>
                  </div>
                `
              )}
            </div>
          </forge-scroll-area>
        </div>

        <div style="font-size: var(--font-size-xs); color: var(--text-muted); text-align: center; font-style: italic;">
          Tip: Hover over the right edge or scroll to see the dark custom scrollbars glow orange on direct mouse hover!
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const HoverOnly: Story = {
  args: {
    scrollbarVisibility: 'hover',
  },
};

export const AlwaysVisible: Story = {
  args: {
    scrollbarVisibility: 'always',
  },
};

export const AutoVisible: Story = {
  args: {
    scrollbarVisibility: 'auto',
  },
};

export const LargeTextContent: Story = {
  render: () => html`
    <div style="width: 100%; max-width: 600px; height: 350px; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-surface); overflow: hidden;">
      <forge-scroll-area scrollbar-visibility="always">
        <div style="padding: var(--space-5); color: var(--text); line-height: 1.6; font-size: var(--font-size-sm); display: flex; flex-direction: column; gap: var(--space-4);">
          <h2 style="font-family: var(--font-display); font-size: var(--font-size-xl); color: var(--forge); margin: 0 0 var(--space-2) 0;">
            THE FORGE ARCHITECTURE PLATFORM
          </h2>
          <p>
            Welcome to the technical specification of the DriveForge core rendering system. Our components are designed around a single immutable principle: performance is not optional. Every pixel, every layout shift, and every shadow root are carefully budgeted to execute within the golden 16.6ms window for flawless 60fps telemetry rendering.
          </p>
          <p>
            By relying on native browser primitives like Custom Elements and Shadow DOM, we minimize overhead while maintaining absolute isolation from external stylesheet contamination. Under the hood, CSS custom variables serve as the lifeblood of our tokenized system. By inheriting styling values across boundaries, they eliminate duplicate styling definitions and allow dynamic theme flipping with zero layout recalculations.
          </p>
          <p>
            This scroll container uses custom WebKit pseudo-elements coupled with custom scrollbar-color bindings in Firefox. It is packaged with standard Lit attributes to give users complete control over scrollbar density and visibility. When the "hover" attribute is selected, scrollbars remain fully transparent until a mouse pointer triggers a fade-in animation on the container, achieving a clean interface suited for dashboard telemetry screens and dense terminal panels alike.
          </p>
          <p>
            Thank you for selecting DriveForge for your mission-critical operations.
          </p>
        </div>
      </forge-scroll-area>
    </div>
  `,
};
