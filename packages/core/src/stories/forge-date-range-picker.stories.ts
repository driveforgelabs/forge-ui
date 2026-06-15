import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-date-range-picker.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Core/forge-date-range-picker',
  component: 'forge-date-range-picker',
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: 'text',
      description: 'Active start date in YYYY-MM-DD format.',
    },
    endDate: {
      control: 'text',
      description: 'Active end date in YYYY-MM-DD format.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the date range picker interaction.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    startDate: '2023-10-12',
    endDate: '2023-10-18',
    disabled: false,
  },
  render: ({ startDate, endDate, disabled }) => {
    const handleRangeChange = (e: CustomEvent) => {
      console.log('Date range changed:', e.detail);
    };

    return html`
      <div style="max-width: 320px; min-height: 400px;">
        <forge-date-range-picker
          startDate=${startDate}
          endDate=${endDate}
          ?disabled=${disabled}
          @forge-change=${handleRangeChange}
        ></forge-date-range-picker>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    startDate: '',
    endDate: '',
  },
};

export const Disabled: Story = {
  args: {
    startDate: '2023-10-12',
    endDate: '2023-10-18',
    disabled: true,
  },
};
