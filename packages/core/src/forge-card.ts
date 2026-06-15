import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type CardVariant = 'default' | 'active' | 'inset' | 'cluster' | 'filled';

/**
 * `forge-card` — Surface container. Use as a layout primitive; put content via slot.
 *
 * @attr variant  default | active | inset | cluster | filled
 * @attr padding  Override inner padding (CSS value)
 *
 * @slot default
 * @csspart card  The inner card element
 */
@customElement('forge-card')
export class ForgeCard extends LitElement {
  @property({ reflect: true }) variant: CardVariant = 'default';
  @property() padding = '';

  static styles = [
    css`
      :host { display: block; }

      .card {
        background: var(--bg-surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 16px;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
      }

      :host([variant='active']) .card {
        border-color: var(--forge);
        box-shadow: var(--shadow-forge);
      }

      :host([variant='inset']) .card {
        background: var(--bg-inset);
        border-color: var(--border-subtle);
        border-radius: var(--radius-sm);
      }

      :host([variant='cluster']) .card {
        background: var(--bg-cluster);
        border-color: var(--border-subtle);
        border-radius: 0;
      }

      :host([variant='filled']) .card {
        background: var(--bg-elevated);
        border-color: var(--border-subtle);
      }
    `,
  ];

  render() {
    const style = this.padding ? `padding: ${this.padding};` : '';
    return html`<div class="card" part="card" style="${style}"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-card': ForgeCard;
  }
}
