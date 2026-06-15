import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-heatmap-cell` — Single cell primitive for heatmap grids.
 *
 * Compose many cells into a tyre-temp grid, sector map, or GitHub-style
 * contribution chart. Colour interpolates from the low-color to high-color
 * based on the normalised value (0–1).
 *
 * @attr value      Normalised value 0–1
 * @attr low-color  Color at value 0 (default: transparent bg)
 * @attr high-color Color at value 1 (default: forge orange)
 * @attr size       Cell size in px (default 16)
 * @attr radius     Border radius in px (default 2)
 * @attr label      Tooltip/aria label
 */
@customElement('forge-heatmap-cell')
export class ForgeHeatmapCell extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ attribute: 'low-color' }) lowColor = 'rgba(0,0,0,0)';
  @property({ attribute: 'high-color' }) highColor = '#F04D00';
  @property({ type: Number }) size = 16;
  @property({ type: Number }) radius = 2;
  @property() label = '';

  static styles = [
    css`
      :host { display: inline-flex; }

      .cell {
        cursor: default;
        transition: transform var(--duration-fast) ease, filter var(--duration-fast) ease;
        outline: none;
      }

      .cell:hover { transform: scale(1.25); filter: brightness(1.2); }
      .cell:focus-visible { outline: 2px solid var(--forge); outline-offset: 2px; }
    `,
  ];

  private _interpolate(): string {
    const v = Math.min(Math.max(this.value, 0), 1);
    const low = this._parseColor(this.lowColor);
    const high = this._parseColor(this.highColor);
    if (!low || !high) return this.highColor;
    const r = Math.round(low[0] + (high[0] - low[0]) * v);
    const g = Math.round(low[1] + (high[1] - low[1]) * v);
    const b = Math.round(low[2] + (high[2] - low[2]) * v);
    const a = low[3] + (high[3] - low[3]) * v;
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }

  private _parseColor(c: string): [number, number, number, number] | null {
    // Support hex and rgba
    const hex = c.match(/^#([0-9a-f]{6})$/i);
    if (hex) {
      const n = parseInt(hex[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
    }
    const rgba = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgba) return [+rgba[1], +rgba[2], +rgba[3], rgba[4] !== undefined ? +rgba[4] : 1];
    return null;
  }

  render() {
    const bg = this._interpolate();
    return html`
      <div
        class="cell"
        style="
          width:${this.size}px;
          height:${this.size}px;
          border-radius:${this.radius}px;
          background:${bg};
        "
        role="gridcell"
        aria-label="${this.label || `Value: ${(this.value * 100).toFixed(0)}%`}"
        tabindex="0"
        part="cell"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-heatmap-cell': ForgeHeatmapCell;
  }
}
