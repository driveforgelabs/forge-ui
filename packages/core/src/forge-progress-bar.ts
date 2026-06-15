import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ProgressBarColor = 'forge' | 'green' | 'amber' | 'red' | 'blue';

/**
 * `forge-progress-bar` — Horizontal fill bar for usage and status display.
 *
 * @attr value   Current value (0–max)
 * @attr max     Maximum value (default 100)
 * @attr color   forge | green | amber | red | blue  (default: forge)
 * @attr label   Optional text label above the bar
 * @attr unit    Optional unit appended to the value
 * @attr show-value  Show numeric value/percentage
 * @attr animate     Animate the fill on load
 */
@customElement('forge-progress-bar')
export class ForgeProgressBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ reflect: true }) color: ProgressBarColor = 'forge';
  @property() label = '';
  @property() unit = '';
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  @property({ type: Boolean, attribute: 'animated' }) animated = false;

  static styles = [
    css`
      :host { display: block; }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 6px;
        font-family: var(--font-mono);
        font-size: 11px;
        -webkit-font-smoothing: antialiased;
      }

      .header-label { color: var(--fg-2); letter-spacing: 0.06em; text-transform: uppercase; }
      .header-value { color: var(--fg-1); }

      .track {
        width: 100%;
        height: 6px;
        border-radius: var(--radius-full);
        background: var(--bg-elevated);
        border: 1px solid var(--border);
        overflow: hidden;
      }

      .fill {
        height: 100%;
        border-radius: var(--radius-full);
        transition: width var(--duration-slow) ease;
        position: relative;
      }

      .fill::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 0%, var(--shine-overlay) 50%, transparent 100%);
        border-radius: inherit;
      }

      :host([color='forge']) .fill { background: var(--forge); box-shadow: 0 0 8px var(--forge-glow); }
      :host([color='green']) .fill { background: var(--data-green); box-shadow: 0 0 6px rgba(34,212,122,0.35); }
      :host([color='amber']) .fill { background: var(--data-amber); }
      :host([color='red'])   .fill { background: var(--data-red); }
      :host([color='blue'])  .fill { background: var(--data-blue); }
    `,
  ];

  private get _pct() {
    return Math.min(Math.max(this.value / (this.max || 1), 0), 1);
  }

  render() {
    const pct = this._pct;
    const displayVal = this.unit ? `${this.value}${this.unit}` : `${Math.round(pct * 100)}%`;

    return html`
      ${this.label || this.showValue
        ? html`
            <div class="header" part="header">
              ${this.label ? html`<span class="header-label" part="header-label">${this.label}</span>` : ''}
              ${this.showValue ? html`<span class="header-value" part="header-value">${displayVal}</span>` : ''}
            </div>
          `
        : ''}
      <div class="track" role="progressbar" aria-valuenow="${this.value}" aria-valuemin="0" aria-valuemax="${this.max}" part="track">
        <div
          class="fill"
          style="width: ${pct * 100}%"
          part="fill"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-progress-bar': ForgeProgressBar;
  }
}
