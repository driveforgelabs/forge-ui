import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * `forge-date-range-picker` — Professional telemetry analytics session date range picker
 * with a high-fidelity interactive calendar grid.
 *
 * @attr startDate  Active range start date (Format: YYYY-MM-DD)
 * @attr endDate    Active range end date (Format: YYYY-MM-DD)
 * @attr disabled   Disables interaction
 * @fires forge-change  Fired when date range selection changes/completes {startDate: string, endDate: string}
 */
@customElement('forge-date-range-picker')
export class ForgeDateRangePicker extends LitElement {
  @property({ type: String, reflect: true }) startDate = '';
  @property({ type: String, reflect: true }) endDate = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _isOpen = false;
  @state() private _currentYear = new Date().getFullYear();
  @state() private _currentMonth = new Date().getMonth();
  @state() private _hoverDate: string | null = null;

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        font-family: var(--font-body);
      }

      .picker-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 9px 12px;
        cursor: pointer;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        user-select: none;
        box-sizing: border-box;
      }

      :host([disabled]) .picker-trigger {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }

      .picker-trigger:hover {
        border-color: var(--border-strong);
      }

      .picker-trigger[aria-expanded='true'] {
        border-color: var(--forge);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      .range-text {
        font-size: 14px;
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
      }

      .range-text.is-placeholder {
        color: var(--fg-3);
      }

      .calendar-icon {
        color: var(--fg-3);
        flex-shrink: 0;
        margin-left: var(--space-2);
        transition: color var(--duration-fast) ease;
      }

      .picker-trigger:hover .calendar-icon {
        color: var(--fg-1);
      }

      .picker-trigger[aria-expanded='true'] .calendar-icon {
        color: var(--forge);
      }

      /* Popover Container */
      .popover {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        z-index: 600;
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-md);
        box-shadow:
          0 16px 32px rgba(0, 0, 0, 0.7),
          0 0 0 1px rgba(255, 255, 255, 0.04);
        padding: var(--space-4);
        width: 290px;
        display: none;
        user-select: none;
        box-sizing: border-box;
      }

      .popover.is-open {
        display: block;
      }

      /* Popover header & Nav */
      .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-3);
      }

      .month-title {
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
      }

      .nav-btn {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: var(--space-1);
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          background var(--duration-fast) ease,
          color var(--duration-fast) ease;
        outline: none;
      }

      .nav-btn:hover {
        background: var(--bg-elevated);
        color: var(--fg-1);
      }

      .nav-btn:focus-visible {
        box-shadow: 0 0 0 2px var(--forge);
      }

      /* Day Names Header */
      .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        color: var(--fg-3);
        margin-bottom: var(--space-2);
        letter-spacing: 0.05em;
      }

      /* Date Grid */
      .days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
      }

      .day {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        color: var(--fg-1);
        cursor: pointer;
        border-radius: var(--radius-xs);
        transition:
          background var(--duration-fast) ease,
          color var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
      }

      .day:hover {
        background: var(--bg-elevated);
        color: var(--forge-light);
      }

      .day.is-outside {
        color: var(--fg-3);
        opacity: 0.4;
      }

      .day.is-start {
        background: var(--forge) !important;
        color: #ffffff !important;
        font-weight: 700;
        border-radius: var(--radius-xs) 0 0 var(--radius-xs);
      }

      .day.is-end {
        background: var(--forge) !important;
        color: #ffffff !important;
        font-weight: 700;
        border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
      }

      .day.is-start.is-end {
        border-radius: var(--radius-xs);
      }

      .day.is-in-range {
        background: var(--forge-subtle) !important;
        color: var(--forge-light) !important;
        border-radius: 0;
      }

      .day.is-in-range-hover {
        background: rgba(240, 77, 0, 0.06) !important;
        color: var(--forge-light) !important;
        border-radius: 0;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('startDate') && this.startDate) {
      const parts = this.startDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        if (!isNaN(year) && !isNaN(month)) {
          this._currentYear = year;
          this._currentMonth = month;
        }
      }
    }
  }

  private _handleDocumentClick = (e: MouseEvent) => {
    if (!this._isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._isOpen = false;
    }
  };

  private _togglePopover() {
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
  }

  private _prevMonth() {
    if (this._currentMonth === 0) {
      this._currentMonth = 11;
      this._currentYear--;
    } else {
      this._currentMonth--;
    }
  }

  private _nextMonth() {
    if (this._currentMonth === 11) {
      this._currentMonth = 0;
      this._currentYear++;
    } else {
      this._currentMonth++;
    }
  }

  private _handleDayClick(dateStr: string) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = dateStr;
      this.endDate = '';
    } else {
      if (dateStr < this.startDate) {
        this.startDate = dateStr;
      } else {
        this.endDate = dateStr;
        this.dispatchEvent(
          new CustomEvent('forge-change', {
            bubbles: true,
            composed: true,
            detail: { startDate: this.startDate, endDate: this.endDate },
          })
        );
        this._isOpen = false;
      }
    }
  }

  private _handleDayMouseEnter(dateStr: string) {
    if (this.startDate && !this.endDate) {
      this._hoverDate = dateStr;
    }
  }

  private _handleDayMouseLeave() {
    this._hoverDate = null;
  }

  private _getDayClasses(dateStr: string, isCurrentMonth: boolean) {
    const classes = ['day'];
    if (!isCurrentMonth) classes.push('is-outside');

    const isSelectedStart = this.startDate === dateStr;
    const isSelectedEnd = this.endDate === dateStr;

    if (isSelectedStart) classes.push('is-start');
    if (isSelectedEnd) classes.push('is-end');

    if (this.startDate && this.endDate) {
      if (dateStr > this.startDate && dateStr < this.endDate) {
        classes.push('is-in-range');
      }
    } else if (this.startDate && this._hoverDate) {
      if (dateStr > this.startDate && dateStr <= this._hoverDate) {
        if (dateStr === this._hoverDate) {
          classes.push('is-end');
        } else {
          classes.push('is-in-range-hover');
        }
      }
    }

    return classes.join(' ');
  }

  private _generateCalendarDays() {
    const year = this._currentYear;
    const month = this._currentMonth;
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

    // Padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dayNum = prevMonthTotalDays - i;
      days.push({
        dateStr: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        dayNum,
        isCurrentMonth: false,
      });
    }

    // Days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayNum: i,
        isCurrentMonth: true,
      });
    }

    // Padding days from next month to fill standard 42-day calendar grid
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        dateStr: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayNum: i,
        isCurrentMonth: false,
      });
    }

    return days;
  }

  render() {
    const calendarDays = this._generateCalendarDays();
    const triggerText =
      this.startDate || this.endDate
        ? `${this.startDate || 'YYYY-MM-DD'}  —  ${this.endDate || 'YYYY-MM-DD'}`
        : 'SELECT SESSION DATE RANGE';

    return html`
      <div
        class="picker-trigger"
        part="trigger"
        role="button"
        aria-expanded="${this._isOpen ? 'true' : 'false'}"
        @click="${this._togglePopover}"
      >
        <span class="range-text ${!this.startDate && !this.endDate ? 'is-placeholder' : ''}" part="range-text">
          ${triggerText}
        </span>
        <svg
          class="calendar-icon"
          part="calendar-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      <div class="popover ${this._isOpen ? 'is-open' : ''}" part="popover">
        <div class="nav-header">
          <button class="nav-btn" @click="${this._prevMonth}" aria-label="Previous month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span class="month-title">${MONTH_NAMES[this._currentMonth]} ${this._currentYear}</span>
          <button class="nav-btn" @click="${this._nextMonth}" aria-label="Next month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="weekdays">
          <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
        </div>

        <div class="days-grid">
          ${calendarDays.map(
            day => html`
              <div
                class="${this._getDayClasses(day.dateStr, day.isCurrentMonth)}"
                @click="${() => this._handleDayClick(day.dateStr)}"
                @mouseenter="${() => this._handleDayMouseEnter(day.dateStr)}"
                @mouseleave="${this._handleDayMouseLeave}"
              >
                ${day.dayNum}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-range-picker': ForgeDateRangePicker;
  }
}
