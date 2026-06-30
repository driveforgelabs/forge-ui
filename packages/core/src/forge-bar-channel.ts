import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-bar-channel` — Horizontal bar telemetry channel, used in cluster
 * and session-data UIs alongside arc gauges.
 *
 * @attr label   Channel name (rendered uppercase)
 * @attr value   Displayed numeric value (string for pre-formatted values)
 * @attr max     Numeric maximum (used with `value` to compute pct)
 * @attr pct     Override fill percentage 0–1 (takes priority over value/max)
 * @attr unit    Unit abbreviation shown after value
 * @attr color   Bar fill color (CSS value or hex)
 */
@customElement('forge-bar-channel')
export class ForgeBarChannel extends LitElement {
  @property() label = '';
  @property() value: string | number = '';
  @property({ type: Number }) max = 100;
  @property({ type: Number }) pct = -1;
  @property({ type: Number }) peak = -1;
  @property() unit = '';
  @property() color = 'var(--forge)';

  static styles = [
    css`
      :host { display: block; }

      .channel {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }

      .label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.14em;
        color: var(--fg-3);
        text-transform: uppercase;
        -webkit-font-smoothing: antialiased;
      }

      .reading {
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
      }

      .unit {
        font-size: 9px;
        color: var(--fg-3);
        margin-left: 2px;
        font-weight: 400;
      }

      .track {
        position: relative;
        height: 4px;
        background: var(--track-bg);
        border-radius: 1px;
      }

      .fill {
        height: 4px;
        border-radius: 1px;
        transition: width var(--duration-slow, 400ms) linear;
      }

      .peak {
        position: absolute;
        top: -2px;
        width: 1px;
        height: 8px;
        background: var(--tick-peak);
        pointer-events: none;
      }
    `,
  ];

  private get _fillPct(): number {
    if (this.pct >= 0) return Math.min(Math.max(this.pct, 0), 1);
    const numVal = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
    if (isNaN(numVal) || this.max <= 0) return 0;
    return Math.min(Math.max(numVal / this.max, 0), 1);
  }

  render() {
    const pct = this._fillPct;
    return html`
      <div class="channel" part="channel">
        <div class="header">
          ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
          <span class="reading" style="color:${this.color};" part="reading">
            ${this.value}${this.unit ? html`<span class="unit">${this.unit}</span>` : nothing}
          </span>
        </div>
        <div class="track" part="track">
          <div
            class="fill"
            part="fill"
            style="width:${(pct * 100).toFixed(1)}%;background:${this.color};"
          ></div>
          ${this.peak >= 0
            ? html`<div class="peak" part="peak" style="left:${(Math.min(Math.max(this.peak, 0), 1) * 100).toFixed(1)}%;"></div>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-bar-channel': ForgeBarChannel;
  }
}
