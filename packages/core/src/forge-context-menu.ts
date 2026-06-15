import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-context-menu` — Right-click menu.
 *
 * @attr open     boolean, reflect
 * @attr x        number, clientX coordinate
 * @attr y        number, clientY coordinate
 *
 * @slot default  list of action items/links
 * @fires forge-select  {item: HTMLElement}
 */
@customElement('forge-context-menu')
export class ForgeContextMenu extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;

  static styles = [
    css`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        pointer-events: none;
      }

      :host([open]) {
        pointer-events: all;
      }

      .menu {
        position: absolute;
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-sm);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        min-width: 160px;
        max-width: 280px;
        padding: 6px 0;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;
        transition:
          opacity var(--duration-fast) ease,
          transform var(--duration-fast) ease;
      }

      :host([open]) .menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      /* Styles for slotted list items in default slot */
      ::slotted(*) {
        font-family: var(--font-body);
        font-size: 13px;
        color: var(--fg-2);
        padding: 8px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        transition:
          background var(--duration-fast) ease,
          color var(--duration-fast) ease;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
      }

      ::slotted(*:hover) {
        background: var(--bg-elevated);
        color: var(--fg-1);
      }

      ::slotted(*:focus-visible) {
        outline: 2px solid var(--forge);
        background: var(--bg-elevated);
        color: var(--fg-1);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('contextmenu', this._onDocumentContextMenu, true);
    document.addEventListener('keydown', this._onDocumentKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('contextmenu', this._onDocumentContextMenu, true);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  private _onDocumentClick = (e: MouseEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  };

  private _onDocumentContextMenu = (e: MouseEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  };

  private _onDocumentKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') {
      this.open = false;
    }
  };

  private _handleMenuClick(e: MouseEvent) {
    const path = e.composedPath();
    const item = path.find(
      (node) => node instanceof HTMLElement && node.parentElement === this
    ) as HTMLElement | undefined;

    if (item) {
      if (item.hasAttribute('disabled') || (item as any).disabled) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent('forge-select', {
          bubbles: true,
          composed: true,
          detail: { item },
        })
      );
      this.open = false;
    }
  }

  render() {
    return html`
      <div
        class="menu"
        part="menu"
        style="left: ${this.x}px; top: ${this.y}px;"
        @click="${this._handleMenuClick}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-context-menu': ForgeContextMenu;
  }
}
