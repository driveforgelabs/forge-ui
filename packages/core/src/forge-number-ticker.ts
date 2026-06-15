import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * `forge-number-ticker` — Animated counter that rolls between values.
 *
 * Ideal for live telemetry readings — updates animate with an ease-out roll.
 *
 * @attr value     Target numeric value
 * @attr decimals  Decimal places to display (default 0)
 * @attr unit      Unit string appended after the value
 * @attr duration  Animation duration in ms (default 600)
 * @attr prefix    Optional prefix (e.g. '$', '+')
 */
@customElement('forge-number-ticker')
export class ForgeNumberTicker extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) decimals = 0;
  @property() unit = '';
  @property() prefix = '';
  @property({ type: Number }) duration = 600;

  @state() private _displayed = 0;

  private _from = 0;
  private _start = 0;
  private _raf = 0;

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: baseline;
        font-family: var(--font-mono);
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
        font-variant-numeric: tabular-nums;
      }

      .prefix, .unit {
        font-size: 0.7em;
        color: var(--fg-3);
        margin: 0 1px;
      }

      .value { transition: color var(--duration-fast) ease; }
    `,
  ];

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this._animate(changed.get('value') as number ?? this._displayed, this.value);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._raf);
  }

  private _animate(from: number, to: number) {
    cancelAnimationFrame(this._raf);
    this._from = from;
    this._start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - this._start;
      const progress = Math.min(elapsed / this.duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      this._displayed = this._from + (to - this._from) * ease;
      if (progress < 1) {
        this._raf = requestAnimationFrame(tick);
      } else {
        this._displayed = to;
      }
    };

    this._raf = requestAnimationFrame(tick);
  }

  render() {
    const formatted = this._displayed.toFixed(this.decimals);
    return html`
      ${this.prefix ? html`<span class="prefix" part="prefix">${this.prefix}</span>` : ''}
      <span class="value" part="value">${formatted}</span>
      ${this.unit ? html`<span class="unit" part="unit">${this.unit}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-number-ticker': ForgeNumberTicker;
  }
}
