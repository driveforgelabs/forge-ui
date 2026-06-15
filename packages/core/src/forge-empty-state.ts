import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-empty-state` — Highly polished, reusable empty state placeholder.
 *
 * @attr heading      Main headline
 * @attr description  Detailed descriptive text explaining the empty state
 * @slot icon         Optional custom icon / illustration (fallback SVG provided)
 * @slot default      Action buttons (Call-to-Action)
 */
@customElement('forge-empty-state')
export class ForgeEmptyState extends LitElement {
  @property() heading = '';
  @property() description = '';

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--space-6) var(--space-5);
        background: var(--bg-surface);
        border: 1px dashed var(--border-strong);
        border-radius: var(--radius-lg);
        max-width: 480px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      .icon-container {
        color: var(--fg-3);
        margin-bottom: var(--space-4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--duration-fast) ease;
      }

      .container:hover .icon-container {
        color: var(--forge-light);
      }

      ::slotted([slot='icon']) {
        width: 48px;
        height: 48px;
        color: var(--forge);
      }

      .heading {
        font-family: var(--font-display);
        font-size: 20px;
        font-weight: 600;
        color: var(--fg-1);
        text-transform: uppercase;
        letter-spacing: 0.02em;
        margin: 0 0 var(--space-2) 0;
        -webkit-font-smoothing: antialiased;
      }

      .description {
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-2);
        line-height: 1.5;
        margin: 0 0 var(--space-5) 0;
        max-width: 360px;
        -webkit-font-smoothing: antialiased;
      }

      .actions {
        display: flex;
        gap: var(--space-3);
        justify-content: center;
        align-items: center;
      }
    `,
  ];

  render() {
    return html`
      <div class="container" part="container">
        <div class="icon-container" part="icon-container">
          <slot name="icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </slot>
        </div>
        ${this.heading ? html`<h3 class="heading" part="heading">${this.heading}</h3>` : ''}
        ${this.description ? html`<p class="description" part="description">${this.description}</p>` : ''}
        <div class="actions" part="actions">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-empty-state': ForgeEmptyState;
  }
}
