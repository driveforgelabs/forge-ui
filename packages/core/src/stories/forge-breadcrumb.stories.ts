import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-breadcrumb.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-breadcrumb',
  component: 'forge-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text', description: 'Separator glyph' },
  },
  args: { separator: '/' },
  render: ({ separator }) => html`
    <forge-breadcrumb
      .items=${[
        { label: 'Sessions', href: '#' },
        { label: '2026-06-09', href: '#' },
        { label: 'Run 3' },
      ]}
      separator=${separator}
    ></forge-breadcrumb>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story     = {};
export const Chevron: Story     = { args: { separator: '›' } };
export const DeepNested: Story  = {
  name: 'Deep nested path',
  render: () => html`
    <forge-breadcrumb
      .items=${[
        { label: 'Events', href: '#' },
        { label: 'Silverstone 2026', href: '#' },
        { label: 'Qualifying', href: '#' },
        { label: 'Lap 14' },
      ]}
      separator="›"
    ></forge-breadcrumb>
  `,
};

export const RootOnly: Story = {
  name: 'Root only',
  render: () => html`
    <forge-breadcrumb .items=${[{ label: 'Dashboard' }]}></forge-breadcrumb>
  `,
};
