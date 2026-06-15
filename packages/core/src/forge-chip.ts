import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ChipVariant = 'filled' | 'outline' | 'pill';
export type ChipColor = 'forge' | 'green' | 'amber' | 'red' | 'blue' | 'neutral' | 'purple';

/**
 * `forge-chip` — Status pill, tag chip, or outline badge.
 *
 * @attr variant  filled | outline | pill
 * @attr color    forge | green | amber | red | blue | neutral | purple
 * @attr dot      show a dot indicator
 *
 * @slot default  Chip label
 */
@customElement('forge-chip')
export class ForgeChip extends LitElement {
  @property({ reflect: true }) variant: ChipVariant = 'filled';
  @property({ reflect: true }) color: ChipColor = 'neutral';
  @property({ type: Boolean, reflect: true }) dot = false;

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: var(--label-family, var(--font-mono));
        font-weight: var(--label-weight, 500);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        white-space: nowrap;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      /* ── Filled (sharp, data-label) ──────────────────────── */
      :host([variant='filled']) .chip,
      :host(:not([variant])) .chip {
        border-radius: var(--radius-xs);
        padding: 3px 8px;
        border: 1px solid transparent;
      }

      /* ── Outline ─────────────────────────────────────────── */
      :host([variant='outline']) .chip {
        border-radius: var(--radius-xs);
        padding: 3px 8px;
        border: 1px solid;
      }

      /* ── Pill ────────────────────────────────────────────── */
      :host([variant='pill']) .chip {
        border-radius: var(--radius-full);
        padding: 3px 10px;
        border: 1px solid transparent;
      }

      /* ── Color — Filled & Pill ───────────────────────────── */
      :host([color='forge'])   .chip { background: var(--forge-dim);      color: var(--forge-light); }
      :host([color='green'])   .chip { background: var(--data-green-dim); color: var(--data-green); }
      :host([color='amber'])   .chip { background: var(--data-amber-dim); color: var(--data-amber); }
      :host([color='red'])     .chip { background: var(--data-red-dim);   color: var(--data-red); }
      :host([color='blue'])    .chip { background: var(--data-blue-dim);  color: var(--data-blue); }
      :host([color='neutral']) .chip { background: var(--bg-elevated);    color: var(--fg-2); }
      :host([color='purple'])  .chip { background: var(--data-purple-dim); color: var(--data-purple); }

      /* ── Color — Outline overrides ───────────────────────── */
      :host([variant='outline'][color='forge'])   .chip { border-color: rgba(240,77,0,0.4);    background: var(--forge-subtle); }
      :host([variant='outline'][color='green'])   .chip { border-color: rgba(34,212,122,0.3);  background: var(--data-green-dim); }
      :host([variant='outline'][color='amber'])   .chip { border-color: rgba(245,166,35,0.3);  background: var(--data-amber-dim); }
      :host([variant='outline'][color='red'])     .chip { border-color: rgba(229,62,62,0.3);   background: var(--data-red-dim); }
      :host([variant='outline'][color='blue'])    .chip { border-color: rgba(74,158,255,0.3);  background: var(--data-blue-dim); }
      :host([variant='outline'][color='neutral']) .chip { border-color: var(--border);         background: transparent; }
      :host([variant='outline'][color='purple'])  .chip { border-color: var(--data-purple-border); background: var(--data-purple-dim); }

      .dot {
        width: 5px;
        height: 5px;
        background: currentColor;
        flex-shrink: 0;
      }
    `,
  ];

  render() {
    return html`
      <span class="chip" part="chip">
        ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip': ForgeChip;
  }
}
