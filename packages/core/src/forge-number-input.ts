import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-number-input` — Precise numeric stepper input with plus/minus buttons.
 *
 * @attr value     number
 * @attr min       number
 * @attr max       number
 * @attr step      number
 * @attr disabled  boolean
 *
 * @fires forge-change  {value: number}
 */
@customElement('forge-number-input')
export class ForgeNumberInput extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      .number-input-container {
        display: inline-flex;
        align-items: stretch;
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        overflow: hidden;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
      }

      .number-input-container:focus-within:not(.disabled) {
        border-color: var(--border-active);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      .number-input-container.disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      input {
        width: 60px;
        border: none;
        background: transparent;
        outline: none;
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--fg-1);
        text-align: center;
        padding: 8px var(--space-2);
        -moz-appearance: textfield;
        -webkit-font-smoothing: antialiased;
      }

      /* Hide native stepper buttons */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .stepper-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        background: var(--bg-elevated);
        border: none;
        color: var(--fg-2);
        font-family: var(--font-body);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition:
          background var(--duration-fast) ease,
          color var(--duration-fast) ease;
        outline: none;
        user-select: none;
      }

      .stepper-btn:hover:not(:disabled) {
        background: #2e2e34;
        color: var(--fg-1);
      }

      .stepper-btn:active:not(:disabled) {
        background: var(--bg-surface);
      }

      .stepper-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .decrement {
        border-right: 1px solid var(--border);
      }

      .increment {
        border-left: 1px solid var(--border);
      }
    `,
  ];

  private _clampAndSet(val: number) {
    let clamped = val;
    if (clamped < this.min) clamped = this.min;
    if (clamped > this.max) clamped = this.max;

    // Round to step precision if possible, to avoid float precision issues (e.g. 0.1 + 0.2 = 0.300000004)
    const stepStr = this.step.toString();
    const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
    if (decimalPlaces > 0) {
      clamped = parseFloat(clamped.toFixed(decimalPlaces));
    }

    if (this.value !== clamped) {
      this.value = clamped;
      this.dispatchEvent(
        new CustomEvent('forge-change', {
          bubbles: true,
          composed: true,
          detail: { value: clamped },
        })
      );
    } else {
      // Force input display update if value didn't change but was clamped
      const input = this.shadowRoot?.querySelector('input');
      if (input) {
        input.value = clamped.toString();
      }
    }
  }

  private _decrement() {
    if (this.disabled) return;
    this._clampAndSet(this.value - this.step);
  }

  private _increment() {
    if (this.disabled) return;
    this._clampAndSet(this.value + this.step);
  }

  private _onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    let val = parseFloat(target.value);
    if (isNaN(val)) {
      val = 0;
    }
    this._clampAndSet(val);
  }

  render() {
    return html`
      <div class="number-input-container ${this.disabled ? 'disabled' : ''}" part="container">
        <button
          class="stepper-btn decrement"
          part="decrement-btn"
          ?disabled="${this.disabled || this.value <= this.min}"
          @click="${this._decrement}"
        >
          &minus;
        </button>
        <input
          type="number"
          part="input"
          .value="${this.value.toString()}"
          ?disabled="${this.disabled}"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          @change="${this._onInputChange}"
        />
        <button
          class="stepper-btn increment"
          part="increment-btn"
          ?disabled="${this.disabled || this.value >= this.max}"
          @click="${this._increment}"
        >
          +
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-number-input': ForgeNumberInput;
  }
}
