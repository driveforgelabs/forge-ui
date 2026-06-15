import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * `forge-dialog` — Modal dialog with backdrop, keyboard trap, and scroll lock.
 *
 * @attr open      Controls visibility
 * @attr heading   Dialog title
 * @attr size      sm | md | lg | xl  (default: md)
 * @attr no-close  Hide the close button / disable backdrop dismiss
 *
 * @slot default   Main content
 * @slot footer    Action buttons row
 *
 * @fires forge-close  Fired when the dialog requests closing (Escape, backdrop, ✕)
 */
@customElement('forge-dialog')
export class ForgeDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() heading = '';
  @property({ reflect: true }) size: DialogSize = 'md';
  @property({ type: Boolean, attribute: 'no-close' }) noClose = false;

  @query('.panel') private _panel!: HTMLElement;
  @query('.backdrop') private _backdrop!: HTMLElement;

  private _scrollbarWidth = 0;

  static styles = [
    css`
      :host { display: contents; }

      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(3px);
        z-index: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--duration-base) ease;
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: all;
      }

      .panel {
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-md);
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--border-subtle);
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 48px);
        width: 100%;
        transform: translateY(12px) scale(0.98);
        transition:
          transform var(--duration-base) ease,
          opacity var(--duration-base) ease;
        opacity: 0;
        outline: none;
      }

      :host([open]) .panel {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      :host([size='sm']) .panel { max-width: 400px; }
      :host([size='md']) .panel { max-width: 560px; }
      :host([size='lg']) .panel { max-width: 800px; }
      :host([size='xl']) .panel { max-width: 1080px; }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 20px 16px;
        border-bottom: 1px solid var(--border);
        flex-shrink: 0;
      }

      .heading {
        font-family: var(--font-display);
        font-size: 18px;
        font-weight: 600;
        color: var(--fg-1);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }

      .close {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        font-size: 14px;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        transition: color var(--duration-fast) ease, background var(--duration-fast) ease;
        outline: none;
      }
      .close:hover { color: var(--fg-1); background: var(--bg-elevated); }
      .close:focus-visible { outline: 2px solid var(--forge); }

      .body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
        color: var(--fg-1);
        font-family: var(--font-body);
        font-size: 14px;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }

      .footer {
        padding: 14px 20px;
        border-top: 1px solid var(--border);
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        flex-shrink: 0;
      }

      ::slotted([slot='footer']) { display: contents; }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._onDocKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onDocKeydown);
    this._unlockScroll();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._lockScroll();
        requestAnimationFrame(() => this._panel?.focus());
      } else {
        this._unlockScroll();
      }
    }
  }

  private _lockScroll() {
    this._scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${this._scrollbarWidth}px`;
  }

  private _unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (!this.open || this.noClose) return;
    if (e.key === 'Escape') this._close();
  };

  private _onBackdropClick = (e: MouseEvent) => {
    if (!this.noClose && e.target === this._backdrop) this._close();
  };

  private _close() {
    this.dispatchEvent(new CustomEvent('forge-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div
        class="backdrop"
        @click="${this._onBackdropClick}"
        role="presentation"
        part="backdrop"
      >
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-heading"
          tabindex="-1"
          part="panel"
        >
          <div class="header" part="header">
            <h2 class="heading" id="dialog-heading" part="heading">
              ${this.heading}<slot name="heading"></slot>
            </h2>
            ${!this.noClose
              ? html`<button class="close" @click="${this._close}" aria-label="Close dialog" part="close">✕</button>`
              : nothing}
          </div>

          <div class="body" part="body">
            <slot></slot>
          </div>

          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-dialog': ForgeDialog;
  }
}
