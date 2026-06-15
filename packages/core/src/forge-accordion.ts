import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-accordion` — Collapsible panel section with elegant animated expand/collapse.
 *
 * @attr open     Controls expanding/collapsing
 * @attr heading  The header label of the accordion
 * @slot default  Main body content
 */
@customElement('forge-accordion')
export class ForgeAccordion extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() heading = '';

  static styles = [
    css`
      :host {
        display: block;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--bg-surface);
        overflow: hidden;
        transition: border-color var(--duration-fast) ease;
      }

      :host([open]) {
        border-color: var(--border-strong);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--space-3) var(--space-4);
        background: none;
        border: none;
        cursor: pointer;
        user-select: none;
        font-family: var(--font-display);
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--fg-1);
        letter-spacing: 0.03em;
        text-align: left;
        outline: none;
        transition: background var(--duration-fast) ease, color var(--duration-fast) ease;
      }

      .header:hover {
        background: var(--bg-elevated);
        color: var(--forge-light);
      }

      .header:focus-visible {
        background: var(--bg-elevated);
        box-shadow: inset 0 0 0 2px var(--forge);
      }

      .heading {
        margin: 0;
        -webkit-font-smoothing: antialiased;
      }

      .chevron {
        color: var(--fg-3);
        transition: transform var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1),
                    color var(--duration-fast) ease;
        flex-shrink: 0;
        margin-left: var(--space-3);
      }

      .header:hover .chevron {
        color: var(--fg-1);
      }

      :host([open]) .chevron {
        transform: rotate(180deg);
        color: var(--forge);
      }

      .body {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height var(--duration-slow) cubic-bezier(0.4, 0, 0.2, 1),
                    opacity var(--duration-slow) cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host([open]) .body {
        max-height: 1200px; /* High safe bound for standard telemetry cards */
        opacity: 1;
      }

      .content {
        padding: var(--space-4);
        border-top: 1px solid var(--border);
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-2);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }
    `,
  ];

  render() {
    return html`
      <div class="accordion" part="accordion">
        <button
          class="header"
          part="header"
          @click="${this.toggle}"
          aria-expanded="${this.open ? 'true' : 'false'}"
        >
          <span class="heading" part="heading">${this.heading}</span>
          <svg
            class="chevron"
            part="chevron"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="body" part="body" aria-hidden="${!this.open}">
          <div class="content" part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  toggle() {
    this.open = !this.open;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-accordion': ForgeAccordion;
  }
}
