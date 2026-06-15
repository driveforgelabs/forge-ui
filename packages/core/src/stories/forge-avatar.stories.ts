import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-avatar.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-avatar',
  component: 'forge-avatar',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The driver or team full name.',
    },
    src: {
      control: 'text',
      description: 'Profile image URL. If missing or fails to load, falls back to initials.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar container.',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    name: 'Max Verstappen',
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop&crop=face',
    size: 'md',
  },
  render: ({ name, src, size }) => html`
    <forge-avatar name=${name} src=${src} size=${size}></forge-avatar>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const DefaultImage: Story = {};

export const InitialsFallback: Story = {
  args: {
    name: 'Max Verstappen',
    src: '', // empty to trigger fallback
  },
};

export const BrokenImageFallback: Story = {
  args: {
    name: 'Lewis Hamilton',
    src: 'https://broken-link-example.com/notfound.png', // broken image triggers error and fallback
  },
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => html`
    <div style="display:flex; gap:16px; align-items:center;">
      <forge-avatar size="sm" name="Charles Leclerc" src=""></forge-avatar>
      <forge-avatar size="md" name="Charles Leclerc" src=""></forge-avatar>
      <forge-avatar size="lg" name="Charles Leclerc" src=""></forge-avatar>
    </div>
  `,
};

export const GradientColors: Story = {
  name: 'Procedural Gradients',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center;">
      <forge-avatar size="md" name="Max Verstappen"></forge-avatar>
      <forge-avatar size="md" name="Lewis Hamilton"></forge-avatar>
      <forge-avatar size="md" name="Lando Norris"></forge-avatar>
      <forge-avatar size="md" name="Oscar Piastri"></forge-avatar>
      <forge-avatar size="md" name="George Russell"></forge-avatar>
      <forge-avatar size="md" name="Carlos Sainz"></forge-avatar>
    </div>
  `,
};
