import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
export type ToastType = 'info' | 'ok' | 'warn' | 'crit';

/**
 * `forge-toast` — Ephemeral notification with auto-dismiss.
 *
 * Declarative usage: place in DOM and call `.show()` / `.hide()`.
 * Programmatic usage: `ForgeToast.notify('message', 'ok')` — mounts
 * a self-removing toast stack onto `document.body`.
 *
 * @attr type      info | ok | warn | crit
 * @attr message   Notification text (or use default slot)
 * @attr duration  Auto-dismiss ms (0 = manual only, default 4000)
 *
 * @fires forge-toast-dismiss  Fired after hide animation completes
 */
@customElement('forge-toast')
export class ForgeToast extends LitElement {
  @property({ reflect: true }) type: ToastType = 'info';
  @property() message = '';
  @property({ type: Number }) duration = 4000;

  @state() private _visible = false;
  @state() private _exiting = false;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  static styles = [
    css`
      :host { display: block; pointer-events: none; }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 16px;
        border-radius: var(--radius-md);
        border: 1px solid var(--border-strong);
        border-left-width: 3px;
        background: var(--bg-elevated);
        font-family: var(--font-body);
        font-size: 13px;
        color: var(--fg-1);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        pointer-events: all;
        min-width: 240px;
        max-width: 400px;
        opacity: 0;
        transform: translateY(6px);
        transition:
          opacity var(--duration-base) ease,
          transform var(--duration-base) ease;
        -webkit-font-smoothing: antialiased;
      }

      .toast.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .toast.exiting {
        opacity: 0;
        transform: translateY(6px);
      }

      :host([type='info']) .toast { border-left-color: var(--data-blue); }
      :host([type='ok'])   .toast { border-left-color: var(--data-green); }
      :host([type='warn']) .toast { border-left-color: var(--data-amber); }
      :host([type='crit']) .toast { border-left-color: var(--data-red); }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 3px;
      }

      :host([type='info']) .dot { background: var(--data-blue); }
      :host([type='ok'])   .dot { background: var(--data-green); }
      :host([type='warn']) .dot { background: var(--data-amber); }
      :host([type='crit']) .dot { background: var(--data-red); }

      .message {
        flex: 1;
        line-height: 1.45;
        color: var(--fg-1);
      }

      .close {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: 0 2px;
        line-height: 1;
        font-size: 12px;
        display: flex;
        align-items: center;
        transition: color var(--duration-fast) ease;
        flex-shrink: 0;
      }

      .close:hover { color: var(--fg-1); }
    `,
  ];

  show() {
    this._exiting = false;
    this._visible = true;
    if (this._timer) clearTimeout(this._timer);
    if (this.duration > 0) {
      this._timer = setTimeout(() => this.hide(), this.duration);
    }
  }

  hide() {
    if (this._timer) clearTimeout(this._timer);
    this._visible = false;
    this._exiting = true;
    setTimeout(() => {
      this._exiting = false;
      this.dispatchEvent(
        new CustomEvent('forge-toast-dismiss', { bubbles: true, composed: true })
      );
    }, 300);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  /** Mount a self-removing toast onto document.body. */
  static notify(message: string, type: ToastType = 'info', duration = 4000) {
    let stack = document.getElementById('forge-toast-stack') as HTMLElement | null;
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'forge-toast-stack';
      Object.assign(stack.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '8px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      });
      document.body.appendChild(stack);
    }

    const toast = document.createElement('forge-toast') as ForgeToast;
    toast.message = message;
    toast.type = type;
    toast.duration = duration;
    stack.appendChild(toast);
    toast.addEventListener('forge-toast-dismiss', () => toast.remove(), { once: true });
    requestAnimationFrame(() => toast.show());
  }

  render() {
    const cls = [
      'toast',
      this._visible ? 'visible' : '',
      this._exiting ? 'exiting' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${cls}" role="status" aria-live="polite" part="toast">
        <div class="dot" part="dot"></div>
        <span class="message" part="message">
          <slot>${this.message}</slot>
        </span>
        <button
          class="close"
          @click="${this.hide}"
          aria-label="Dismiss"
          part="close"
        >✕</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toast': ForgeToast;
  }
}
