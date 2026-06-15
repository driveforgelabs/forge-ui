import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * `forge-button` — DriveForge action button.
 *
 * @attr variant  primary | secondary | ghost | danger | success
 * @attr size     sm | md | lg
 * @attr disabled
 * @attr type     button | submit | reset
 *
 * @slot default  Button label / content
 * @fires forge-click
 */
@customElement('forge-button')
export class ForgeButton extends LitElement {
  static formAssociated = true;

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
        cursor: not-allowed;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: var(--btn-family, var(--font-display));
        font-weight: var(--btn-weight, 600);
        letter-spacing: var(--btn-tracking, 0.02em);
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition:
          background var(--duration-fast) ease,
          border-color var(--duration-fast) ease,
          transform var(--duration-fast) ease,
          filter var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        white-space: nowrap;
        outline: none;
        border: 1px solid transparent;
        line-height: 1.2;
        -webkit-font-smoothing: antialiased;
      }

      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--forge-glow);
      }

      button:active:not(:disabled) {
        transform: scale(0.97);
      }

      /* ── Sizes ─────────────────────────────────────────────── */
      :host([size='sm']) button { padding: 5px 14px; font-size: 14px; }
      button { padding: 8px 20px; font-size: 16px; }
      :host([size='md']) button { padding: 8px 20px; font-size: 16px; }
      :host([size='lg']) button { padding: 11px 28px; font-size: 18px; }

      /* ── Primary ───────────────────────────────────────────── */
      button,
      :host([variant='primary']) button {
        background: var(--forge);
        color: #fff;
        border-color: transparent;
        clip-path: polygon(0 0, calc(100% - var(--chamfer-sm, 7px)) 0, 100% var(--chamfer-sm, 7px), 100% 100%, 0 100%);
        border-radius: var(--radius-sm) 0 var(--radius-sm) var(--radius-sm);
      }
      :host([variant='primary']) button:hover { background: var(--forge-light); }
      :host([variant='primary']) button:active { background: var(--forge-dim); }
      :host([variant='primary']) button:focus-visible {
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.65);
      }

      /* ── Secondary ─────────────────────────────────────────── */
      :host([variant='secondary']) button {
        background: var(--bg-elevated);
        color: var(--fg-1);
        border-color: var(--border-strong);
      }
      :host([variant='secondary']) button:hover { background: var(--bg-elevated-hover); }

      /* ── Ghost ─────────────────────────────────────────────── */
      :host([variant='ghost']) button {
        background: transparent;
        color: var(--fg-1);
        border-color: var(--border);
      }
      :host([variant='ghost']) button:hover {
        border-color: var(--border-strong);
        background: var(--bg-surface);
      }

      /* ── Danger ────────────────────────────────────────────── */
      :host([variant='danger']) button {
        background: rgba(229, 62, 62, 0.15);
        color: var(--data-red);
        border-color: rgba(229, 62, 62, 0.3);
      }
      :host([variant='danger']) button:hover { background: rgba(229, 62, 62, 0.25); }

      /* ── Success ───────────────────────────────────────────── */
      :host([variant='success']) button {
        background: rgba(34, 212, 122, 0.15);
        color: var(--data-green);
        border-color: rgba(34, 212, 122, 0.3);
      }
      :host([variant='success']) button:hover { background: rgba(34, 212, 122, 0.25); }
    `,
  ];

  render() {
    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('forge-click', { bubbles: true, composed: true, detail: { originalEvent: e } })
    );
    if (this.type === 'submit') {
      this._internals.form?.requestSubmit();
    } else if (this.type === 'reset') {
      this._internals.form?.reset();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': ForgeButton;
  }
}
