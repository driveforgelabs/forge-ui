import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-slider.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-slider',
  component: 'forge-slider',
  tags: ['autodocs'],
  argTypes: {
    value:    { control: 'number' },
    min:      { control: 'number' },
    max:      { control: 'number' },
    step:     { control: 'number' },
    label:    { control: 'text' },
    unit:     { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { value: 75, min: 0, max: 100, step: 1, label: 'Brake bias', unit: '%', disabled: false },
  render: ({ value, min, max, step, label, unit, disabled }) => html`
    <div style="max-width:320px;">
      <forge-slider
        value=${value}
        min=${min}
        max=${max}
        step=${step}
        label=${label}
        unit=${unit}
        ?disabled=${disabled}
      ></forge-slider>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story  = { args: { value: 75, label: 'Brake bias', unit: '%' } };
export const RPM: Story      = { args: { value: 6500, min: 0, max: 12000, step: 100, label: 'Rev limiter', unit: 'RPM' } };
export const Temperature: Story = { args: { value: 85, min: 50, max: 120, step: 1, label: 'Coolant threshold', unit: '°C' } };
export const Disabled: Story = { args: { value: 50, label: 'Locked', disabled: true } };

export const ThresholdPanel: Story = {
  name: 'Threshold panel',
  render: () => html`
    <div style="max-width:360px;display:flex;flex-direction:column;gap:24px;">
      <forge-slider value="85"   min="50"  max="120" step="1"   label="Coolant warn"  unit="°C"></forge-slider>
      <forge-slider value="6500" min="0"   max="12000" step="100" label="Rev limiter" unit="RPM"></forge-slider>
      <forge-slider value="18"   min="10"  max="60"  step="0.5" label="Oil pressure min" unit="psi"></forge-slider>
      <forge-slider value="58"   min="0"   max="100" step="1"   label="Brake bias"    unit="%"></forge-slider>
    </div>
  `,
};
