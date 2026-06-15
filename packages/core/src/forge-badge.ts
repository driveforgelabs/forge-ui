import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type BadgeType = 'ok' | 'warn' | 'crit' | 'info' | 'forge' | 'muted';

/**
 * `forge-badge` — Compact data-label badge used in cards and table rows.
 *
 * @attr type  ok | warn | crit | info | forge | muted
 * @slot default  Badge text (uppercase rendered automatically)
 */
@customElement('forge-badge')
export class ForgeBadge extends LitElement {
  @property({ reflect: true }) type: BadgeType = 'muted';

  static styles = [
    css`
      :host { display: inline-flex; }

      .badge {
        display: inline-flex;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 2px 8px;
        border-radius: var(--radius-xs);
        border: 1px solid;
        white-space: nowrap;
        -webkit-font-smoothing: antialiased;
      }

      :host([type='ok'])    .badge { background: var(--data-green-dim); color: var(--data-green); border-color: rgba(34,212,122,0.25); }
      :host([type='warn'])  .badge { background: var(--data-amber-dim); color: var(--data-amber); border-color: rgba(245,166,35,0.25); }
      :host([type='crit'])  .badge { background: var(--data-red-dim);   color: var(--data-red);   border-color: rgba(229,62,62,0.25); }
      :host([type='info'])  .badge { background: var(--data-blue-dim);  color: var(--data-blue);  border-color: rgba(74,158,255,0.25); }
      :host([type='forge']) .badge { background: var(--forge-subtle);   color: var(--forge);      border-color: rgba(240,77,0,0.25); }
      :host([type='muted']) .badge { background: var(--muted-bg); color: var(--fg-2); border-color: var(--muted-border); }
    `,
  ];

  render() {
    return html`<span class="badge" part="badge"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-badge': ForgeBadge;
  }
}
