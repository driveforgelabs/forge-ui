import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
export type DrawerPosition = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

@customElement('forge-drawer')
export class ForgeDrawer extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ reflect: true }) position: DrawerPosition = 'right';
  @property() heading = '';
  @property({ reflect: true }) size: DrawerSize = 'md';
  @property({ type: Boolean, attribute: 'no-close' }) noClose = false;

  @query('.panel') private _panel!: HTMLElement;
  @query('.backdrop') private _backdrop!: HTMLElement;

  private _scrollbarWidth = 0;

  static styles = [
    css`
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(3px);
        z-index: 500;
        display: flex;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--duration-base) ease;
      }

      :host([position='right']) .backdrop {
        justify-content: flex-end;
      }

      :host([position='left']) .backdrop {
        justify-content: flex-start;
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: all;
      }

      .panel {
        background: var(--bg-surface);
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        transition: transform var(--duration-base) ease;
        outline: none;
      }

      :host([position='left']) .panel {
        border-right: 1px solid var(--border-strong);
        box-shadow: 10px 0 40px rgba(0, 0, 0, 0.6);
        transform: translateX(-100%);
      }

      :host([position='right']) .panel {
        border-left: 1px solid var(--border-strong);
        box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);
        transform: translateX(100%);
      }

      :host([open]) .panel {
        transform: translateX(0);
      }

      /* Sizes */
      :host([size='sm']) .panel { max-width: 360px; }
      :host([size='md']) .panel { max-width: 540px; }
      :host([size='lg']) .panel { max-width: 720px; }

      @media (max-width: 768px) {
        .panel {
          max-width: 100% !important;
        }
      }

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
          aria-labelledby="drawer-heading"
          tabindex="-1"
          part="panel"
        >
          <div class="header" part="header">
            <h2 class="heading" id="drawer-heading" part="heading">
              ${this.heading}<slot name="heading"></slot>
            </h2>
            ${!this.noClose
              ? html`<button class="close" @click="${this._close}" aria-label="Close drawer" part="close">✕</button>`
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
    'forge-drawer': ForgeDrawer;
  }
}
