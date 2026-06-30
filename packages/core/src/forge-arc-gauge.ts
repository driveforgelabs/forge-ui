import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * `forge-arc-gauge` — SVG arc gauge for telemetry display.
 *
 * 240° flat-cap arc with inner tick ring, redline zone, and mono readout.
 * Motion is linear only (no bounce). Past the redline threshold the fill
 * switches to data-red automatically.
 *
 * @attr value      Current reading (numeric)
 * @attr min        Minimum value (default 0)
 * @attr max        Maximum value (default 100)
 * @attr display    Formatted readout string — defaults to value
 * @attr unit       Unit abbreviation shown below the value
 * @attr label      Text label below the gauge (e.g. "Engine Speed")
 * @attr tone       forge | green | amber | blue | red
 * @attr color      Raw CSS color override (still turns red past redline)
 * @attr redline    Fraction 0–1 where the red zone starts (e.g. 0.85)
 * @attr size       SVG render size in px (default 132)
 */
@customElement('forge-arc-gauge')
export class ForgeArcGauge extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property() display = '';
  @property() unit = '';
  @property() label = '';
  @property({ reflect: true }) tone: 'forge' | 'green' | 'amber' | 'blue' | 'red' = 'forge';
  @property() color = '';
  @property({ type: Number }) redline = 0;
  @property({ type: Number }) size = 132;

  private static readonly TONES: Record<string, string> = {
    forge: 'var(--forge, #C2410C)',
    green: 'var(--data-green, #22D47A)',
    amber: 'var(--data-amber, #F5A623)',
    blue:  'var(--data-blue, #4A9EFF)',
    red:   'var(--data-red, #E53E3E)',
  };

  static styles = [
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }

      svg { display: block; }

      .arc-track   { stroke: var(--track-bg); }
      .arc-redline { stroke: var(--gauge-redline-zone); }
      .tick-major  { stroke: var(--tick-major); }
      .tick-minor  { stroke: var(--tick-minor); }

      .arc-fill {
        transition: stroke-dashoffset 300ms linear;
      }

      .label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.14em;
        color: var(--fg-3);
        text-transform: uppercase;
        text-align: center;
        -webkit-font-smoothing: antialiased;
      }
    `,
  ];

  private _polar(cx: number, cy: number, r: number, deg: number): [number, number] {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  private _arcPath(cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string {
    const [x0, y0] = this._polar(cx, cy, r, fromDeg);
    const [x1, y1] = this._polar(cx, cy, r, toDeg);
    const large = toDeg - fromDeg > 180 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }

  render() {
    const START_DEG = 150;
    const SWEEP_DEG = 240;

    const s = this.size;
    const cx = s / 2;
    const r = s / 2 - 8;
    const cy = s / 2 + 6;
    const h = cy + 20;

    const range = this.max - this.min || 1;
    const pct = Math.max(0, Math.min(1, (this.value - this.min) / range));
    const overRedline = this.redline > 0 && pct >= this.redline;

    const baseColor = this.color || ForgeArcGauge.TONES[this.tone] || ForgeArcGauge.TONES.forge;
    const fillColor = overRedline ? 'var(--data-red, #E53E3E)' : baseColor;

    const fillEnd = START_DEG + SWEEP_DEG * pct;
    const redStart = this.redline > 0 ? START_DEG + SWEEP_DEG * this.redline : null;

    const ticks = [];
    for (let i = 0; i <= 12; i++) {
      const deg = START_DEG + (SWEEP_DEG * i) / 12;
      const major = i % 3 === 0;
      const [x0, y0] = this._polar(cx, cy, r - (major ? 14 : 11), deg);
      const [x1, y1] = this._polar(cx, cy, r - 7, deg);
      ticks.push(svg`
        <line
          class=${major ? 'tick-major' : 'tick-minor'}
          x1=${x0.toFixed(2)} y1=${y0.toFixed(2)}
          x2=${x1.toFixed(2)} y2=${y1.toFixed(2)}
          stroke-width=${major ? '1.5' : '1'}
        />
      `);
    }

    const readout = this.display !== '' ? this.display : String(this.value);
    const fontSize = (s / 6.6).toFixed(1);

    return html`
      <svg width=${s} height=${h} viewBox="0 0 ${s} ${h}" part="svg">
        <path
          class="arc-track"
          d=${this._arcPath(cx, cy, r, START_DEG, START_DEG + SWEEP_DEG)}
          stroke-width="5" fill="none" stroke-linecap="butt"
        />
        ${redStart !== null ? svg`
          <path
            class="arc-redline"
            d=${this._arcPath(cx, cy, r, redStart, START_DEG + SWEEP_DEG)}
            stroke-width="5" fill="none" stroke-linecap="butt"
          />
        ` : nothing}
        ${pct > 0 ? svg`
          <path
            class="arc-fill"
            d=${this._arcPath(cx, cy, r, START_DEG, Math.max(START_DEG + 0.5, fillEnd))}
            stroke=${fillColor} stroke-width="5" fill="none"
            stroke-linecap="butt"
          />
        ` : nothing}
        ${ticks}
        <text
          x=${cx} y=${cy + 2} text-anchor="middle"
          fill="var(--fg-1, #F4F4F5)"
          font-size=${fontSize}
          font-weight="300"
          font-family="var(--font-mono, 'IBM Plex Mono', monospace)"
        >${readout}</text>
        ${this.unit ? svg`
          <text
            x=${cx} y=${(cy + s / 8.8).toFixed(1)} text-anchor="middle"
            fill="var(--fg-3, #52525B)"
            font-size="9"
            letter-spacing="1"
            font-family="var(--font-mono, 'IBM Plex Mono', monospace)"
          >${this.unit}</text>
        ` : nothing}
      </svg>
      ${this.label ? html`<div class="label" part="label">${this.label}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-arc-gauge': ForgeArcGauge;
  }
}
