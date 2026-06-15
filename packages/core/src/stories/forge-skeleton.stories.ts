import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-skeleton.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-skeleton',
  component: 'forge-skeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
      description: 'The visual variant of the skeleton',
      table: { defaultValue: { summary: 'text' } },
    },
    animation: {
      control: 'inline-radio',
      options: ['pulse', 'none'],
      description: 'The skeleton animation style',
      table: { defaultValue: { summary: 'pulse' } },
    },
    width: {
      control: 'text',
      description: 'Explicit width of the skeleton (e.g. 100px, 50%)',
    },
    height: {
      control: 'text',
      description: 'Explicit height of the skeleton (e.g. 20px, 10rem)',
    },
  },
  args: {
    variant: 'text',
    animation: 'pulse',
    width: '',
    height: '',
  },
  render: ({ variant, animation, width, height }) => html`
    <forge-skeleton
      variant=${variant}
      animation=${animation}
      width=${width}
      height=${height}
    ></forge-skeleton>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Text: Story = {
  args: { variant: 'text', width: '250px' },
};

export const Circle: Story = {
  args: { variant: 'circle' },
};

export const Rect: Story = {
  args: { variant: 'rect', width: '400px', height: '200px' },
};

export const CardLayoutPlaceholder: Story = {
  name: 'Complex Card Placeholder',
  render: () => html`
    <div style="border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; width: 300px; display: flex; flex-direction: column; gap: 12px; background: var(--bg-surface);">
      <div style="display: flex; gap: 12px; align-items: center;">
        <forge-skeleton variant="circle"></forge-skeleton>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
          <forge-skeleton variant="text" width="60%"></forge-skeleton>
          <forge-skeleton variant="text" width="40%"></forge-skeleton>
        </div>
      </div>
      <forge-skeleton variant="rect" height="120px"></forge-skeleton>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <forge-skeleton variant="text"></forge-skeleton>
        <forge-skeleton variant="text"></forge-skeleton>
        <forge-skeleton variant="text" width="80%"></forge-skeleton>
      </div>
    </div>
  `,
};
