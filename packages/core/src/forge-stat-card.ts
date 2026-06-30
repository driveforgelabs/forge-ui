import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type StatCardState = 'default' | 'active' | 'warn' | 'crit' | 'ok';

export interface MetaItem {
  label: string;
  value: string;
  color?: string;
}

/**
 * `forge-stat-card` — Telemetry/data card. Displays a large stat value with
 * an optional progress bar, badge, and metadata row.
 *
 * @attr label        Card title
 * @attr sub          Card subtitle
 * @attr value        Main value (string for formatted numbers)
 * @attr unit         Unit label shown smaller after value
 * @attr value-color  CSS color for the main value
 * @attr bar          0–100 fill percentage (omit to hide bar)
 * @attr bar-color    CSS color for the bar fill
 * @attr badge        Badge text
 * @attr badge-type   ok | warn | crit | info | forge | muted
 * @attr delta        Delta text (e.g. "−0.8s", "+4.5°")
 * @attr state        default | active | warn | crit | ok
 * @prop meta         Array<{label, value, color?}>
 */
@customElement('forge-stat-card')
export class ForgeStatCard extends LitElement {
  @property() label = '';
  @property() sub = '';
  @property() value: string | number = '';
  @property() unit = '';
  @property({ attribute: 'value-color' }) valueColor = '';
  @property({ type: Number }) bar: number | null = null;
  @property({ attribute: 'bar-color' }) barColor = 'var(--forge)';
  @property() badge = '';
  @property({ attribute: 'badge-type' }) badgeType: 'ok' | 'warn' | 'crit' | 'info' | 'forge' | 'muted' = 'muted';
  @property() delta = '';
  @property({ reflect: true }) state: StatCardState = 'default';
  @property({ attribute: false }) meta: MetaItem[] = [];

  private static readonly BADGE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
    ok:    { bg: 'var(--data-green-dim)', color: 'var(--data-green)', border: 'rgba(34,212,122,0.25)' },
    warn:  { bg: 'var(--data-amber-dim)', color: 'var(--data-amber)', border: 'rgba(245,166,35,0.25)' },
    crit:  { bg: 'var(--data-red-dim)',   color: 'var(--data-red)',   border: 'rgba(229,62,62,0.25)' },
    info:  { bg: 'var(--data-blue-dim)',  color: 'var(--data-blue)',  border: 'rgba(74,158,255,0.25)' },
    forge: { bg: 'var(--forge-subtle)',   color: 'var(--forge)',      border: 'rgba(240,77,0,0.25)' },
    muted: { bg: 'var(--muted-bg)',         color: 'var(--fg-2)',      border: 'var(--muted-border)' },
  };

  static styles = [
    css`
      :host { display: block; }

      .card {
        background: var(--bg-surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 16px 18px;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
      }

      :host([state='active']) .card {
        border-color: var(--forge);
        box-shadow: var(--shadow-forge);
      }
      :host([state='warn']) .card { border-color: var(--data-amber); }
      :host([state='crit']) .card { border-color: var(--data-red); }
      :host([state='ok'])   .card { border-color: var(--data-green); }

      .corner-wedge {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: var(--chamfer-md, 10px) solid var(--forge);
        border-left: var(--chamfer-md, 10px) solid transparent;
        pointer-events: none;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
        gap: 8px;
      }

      .title-block { display: flex; flex-direction: column; gap: 2px; }

      .label {
        font-family: var(--font-body);
        font-size: 13px;
        font-weight: 600;
        color: var(--fg-1);
        line-height: 1.2;
      }

      .sub {
        font-size: 11px;
        color: var(--fg-3);
        line-height: 1.3;
        font-family: var(--font-body);
      }

      .badge {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: var(--radius-xs);
        border: 1px solid;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .stat {
        font-family: var(--font-mono);
        font-size: 28px;
        font-weight: 300;
        color: var(--fg-1);
        line-height: 1;
        margin: 8px 0 4px;
      }

      .stat-unit {
        font-size: 12px;
        color: var(--fg-3);
        font-weight: 400;
        margin-left: 2px;
      }

      .delta {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--fg-2);
        margin-top: 4px;
      }

      .bar-track {
        background: var(--bg-inset);
        border-radius: 2px;
        height: 3px;
        margin-top: 10px;
        overflow: hidden;
      }

      .bar-fill {
        height: 3px;
        border-radius: 2px;
        transition: width var(--duration-slow) var(--ease-linear, linear);
      }

      .meta-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--border);
      }

      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .meta-label {
        font-family: var(--font-mono);
        font-size: 9px;
        color: var(--fg-3);
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .meta-val {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--fg-1);
      }

      .inset-block {
        background: var(--bg-inset);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
        margin-top: 8px;
      }
    `,
  ];

  render() {
    const bc = ForgeStatCard.BADGE_COLORS[this.badgeType] ?? ForgeStatCard.BADGE_COLORS.muted;
    const badgeStyle = `background:${bc.bg};color:${bc.color};border-color:${bc.border};`;

    return html`
      <div class="card" part="card">
        ${this.state === 'active' ? html`<span class="corner-wedge" aria-hidden="true"></span>` : nothing}
        ${this.label || this.badge
          ? html`
              <div class="header" part="header">
                <div class="title-block">
                  ${this.label ? html`<span class="label" part="label">${this.label}</span>` : nothing}
                  ${this.sub ? html`<span class="sub" part="sub">${this.sub}</span>` : nothing}
                </div>
                ${this.badge ? html`<span class="badge" style="${badgeStyle}" part="badge">${this.badge}</span>` : nothing}
              </div>
            `
          : nothing}

        <slot name="inset"></slot>

        ${this.value !== ''
          ? html`
              <div class="stat" style="${this.valueColor ? `color:${this.valueColor};` : ''}" part="value">
                ${this.value}<span class="stat-unit">${this.unit}</span>
              </div>
            `
          : nothing}

        ${this.delta ? html`<div class="delta" part="delta">${this.delta}</div>` : nothing}

        ${this.bar !== null
          ? html`
              <div class="bar-track" part="bar-track">
                <div
                  class="bar-fill"
                  part="bar-fill"
                  style="width:${Math.min(Math.max(this.bar, 0), 100)}%;background:${this.barColor};"
                ></div>
              </div>
            `
          : nothing}

        ${this.meta.length > 0
          ? html`
              <div class="meta-row" part="meta-row">
                ${this.meta.map(
                  (m) => html`
                    <div class="meta-item">
                      <span class="meta-label">${m.label}</span>
                      <span class="meta-val" style="${m.color ? `color:${m.color};` : ''}">${m.value}</span>
                    </div>
                  `
                )}
              </div>
            `
          : nothing}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stat-card': ForgeStatCard;
  }
}
