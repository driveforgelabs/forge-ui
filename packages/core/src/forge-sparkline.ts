import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-sparkline` — Inline SVG trend line for stat-cards and table cells.
 *
 * @attr values        Array of numeric data points
 * @attr color         Stroke color (default: forge orange)
 * @attr width         SVG width in px (default 80)
 * @attr height        SVG height in px (default 28)
 * @attr fill          Show gradient fill under the line
 * @attr stroke-width  Line thickness (default 1.5)
 * @attr dot           Show a dot at the last data point
 */
@customElement('forge-sparkline')
export class ForgeSparkline extends LitElement {
  @property({ type: Array }) values: number[] = [];
  @property() color = '#F04D00';
  @property({ type: Number }) width = 80;
  @property({ type: Number }) height = 28;
  @property({ type: Boolean }) fill = false;
  @property({ type: Number, attribute: 'stroke-width' }) strokeWidth = 1.5;
  @property({ type: Boolean }) dot = false;

  static styles = [
    css`
      :host { display: inline-flex; align-items: center; vertical-align: middle; }
      svg { display: block; overflow: visible; }
    `,
  ];

  private _computePaths() {
    const vals = this.values;
    if (vals.length < 2) return null;

    const w = this.width;
    const h = this.height;
    const pad = this.strokeWidth + 1;
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;

    const pts = vals.map((v, i) => ({
      x: (i / (vals.length - 1)) * w,
      y: h - pad - ((v - min) / range) * (h - pad * 2),
    }));

    // Smooth cubic bezier
    const lineParts = pts.map((pt, i) => {
      if (i === 0) return `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
      const prev = pts[i - 1];
      const cpX = ((prev.x + pt.x) / 2).toFixed(2);
      return `C ${cpX} ${prev.y.toFixed(2)}, ${cpX} ${pt.y.toFixed(2)}, ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    });
    const line = lineParts.join(' ');
    const area = `${line} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;
    const last = pts[pts.length - 1];

    return { line, area, last };
  }

  render() {
    const paths = this._computePaths();
    const uid = `sl-${this.color.replace(/[^a-z0-9]/gi, '')}-${this.width}`;

    return html`
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        part="svg"
        aria-hidden="true"
      >
        ${paths
          ? svg`
              <defs>
                <linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="${this.color}" stop-opacity="0.28"/>
                  <stop offset="100%" stop-color="${this.color}" stop-opacity="0"/>
                </linearGradient>
              </defs>
              ${this.fill
                ? svg`<path d="${paths.area}" fill="url(#${uid})" stroke="none"/>`
                : svg``}
              <path
                d="${paths.line}"
                fill="none"
                stroke="${this.color}"
                stroke-width="${this.strokeWidth}"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              ${this.dot
                ? svg`
                    <circle
                      cx="${paths.last.x}"
                      cy="${paths.last.y}"
                      r="${this.strokeWidth * 2}"
                      fill="${this.color}"
                    />
                  `
                : svg``}
            `
          : svg``}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-sparkline': ForgeSparkline;
  }
}
