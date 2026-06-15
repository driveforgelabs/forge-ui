import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * `forge-slider` — Range input for thresholds and replay scrubbing.
 *
 * @attr value   Current value
 * @attr min     Minimum (default 0)
 * @attr max     Maximum (default 100)
 * @attr step    Step increment (default 1)
 * @attr label   Label text above the slider
 * @attr unit    Unit appended to displayed value
 * @attr disabled
 *
 * @fires forge-change  detail: { value: number }
 * @fires forge-input   detail: { value: number }  (continuous while dragging)
 */
@customElement('forge-slider')
export class ForgeSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property() label = '';
  @property() unit = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _dragging = false;

  static styles = [
    css`
      :host {
        display: block;
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 10px;
        font-family: var(--font-mono);
        font-size: 11px;
        -webkit-font-smoothing: antialiased;
      }

      .header-label { color: var(--fg-2); letter-spacing: 0.06em; text-transform: uppercase; }
      .header-value { color: var(--fg-1); }

      .wrapper {
        position: relative;
        height: 20px;
        display: flex;
        align-items: center;
      }

      .track {
        position: absolute;
        left: 0; right: 0;
        height: 4px;
        border-radius: var(--radius-full);
        background: var(--bg-elevated);
        border: 1px solid var(--border);
        overflow: hidden;
      }

      .fill {
        height: 100%;
        border-radius: var(--radius-full);
        background: var(--forge);
        box-shadow: 0 0 6px var(--forge-glow);
        pointer-events: none;
      }

      input[type='range'] {
        position: absolute;
        left: 0; right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
      }

      .thumb {
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--forge);
        border: 2px solid var(--bg-base);
        box-shadow: 0 0 8px var(--forge-glow);
        transform: translateX(-50%);
        pointer-events: none;
        transition: box-shadow var(--duration-fast) ease, transform var(--duration-fast) ease;
      }

      :host(:focus-within) .thumb,
      .thumb.dragging {
        box-shadow: 0 0 14px var(--forge-glow);
        transform: translateX(-50%) scale(1.2);
      }
    `,
  ];

  private get _pct() {
    return (this.value - this.min) / (this.max - this.min || 1);
  }

  render() {
    const pct = this._pct;
    const displayVal = this.unit ? `${this.value} ${this.unit}` : String(this.value);

    return html`
      ${this.label
        ? html`
            <div class="header" part="header">
              <span class="header-label" part="header-label">${this.label}</span>
              <span class="header-value" part="header-value">${displayVal}</span>
            </div>
          `
        : ''}
      <div class="wrapper" part="wrapper">
        <div class="track" part="track">
          <div class="fill" style="width:${pct * 100}%" part="fill"></div>
        </div>
        <div
          class="thumb ${this._dragging ? 'dragging' : ''}"
          style="left:${pct * 100}%"
          part="thumb"
        ></div>
        <input
          type="range"
          .value="${String(this.value)}"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          ?disabled="${this.disabled}"
          @input="${this._onInput}"
          @change="${this._onChange}"
          @mousedown="${() => (this._dragging = true)}"
          @mouseup="${() => (this._dragging = false)}"
          @touchstart="${() => (this._dragging = true)}"
          @touchend="${() => (this._dragging = false)}"
          aria-label="${this.label || 'Slider'}"
        />
      </div>
    `;
  }

  private _onInput(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(
      new CustomEvent('forge-input', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  private _onChange(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(
      new CustomEvent('forge-change', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-slider': ForgeSlider;
  }
}
