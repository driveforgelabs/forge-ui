import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-popover` — Anchored floating panel with interactive content.
 *
 * @attr open     boolean, reflect
 * @attr align    'left' | 'right' | 'center', default: 'center'
 *
 * @slot trigger  element that triggers the popover
 * @slot default  interactive content inside (e.g. forms/buttons)
 * @fires forge-open-change  {open: boolean}
 */
@customElement('forge-popover')
export class ForgePopover extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ reflect: true }) align: 'left' | 'right' | 'center' = 'center';

  static styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: inline-block;
        cursor: pointer;
      }

      .popover {
        position: absolute;
        top: 100%;
        margin-top: 8px;
        z-index: 100;
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-md);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        min-width: 200px;
        padding: var(--space-4);
        opacity: 0;
        pointer-events: none;
        transition:
          opacity var(--duration-fast) ease,
          transform var(--duration-fast) ease;
      }

      /* ── Alignments ────────────────────────────────────────── */
      :host([align='left']) .popover {
        left: 0;
        right: auto;
        transform: translateY(-8px);
      }
      :host([align='left'][open]) .popover {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      :host([align='right']) .popover {
        right: 0;
        left: auto;
        transform: translateY(-8px);
      }
      :host([align='right'][open]) .popover {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      :host([align='center']) .popover {
        left: 50%;
        transform: translateX(-50%) translateY(-8px);
      }
      :host([align='center'][open]) .popover {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
        pointer-events: all;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  private _setOpen(value: boolean) {
    if (this.open === value) return;
    this.open = value;
    this.dispatchEvent(
      new CustomEvent('forge-open-change', {
        bubbles: true,
        composed: true,
        detail: { open: value },
      })
    );
  }

  private _onDocumentClick = (e: MouseEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._setOpen(false);
    }
  };

  private _onDocumentKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') {
      this._setOpen(false);
    }
  };

  private _handleTriggerClick(e: MouseEvent) {
    e.stopPropagation();
    this._setOpen(!this.open);
  }

  render() {
    return html`
      <div class="trigger" part="trigger" @click="${this._handleTriggerClick}">
        <slot name="trigger"></slot>
      </div>
      <div class="popover" part="popover">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-popover': ForgePopover;
  }
}
