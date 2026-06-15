import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-toggle` — On/off switch with accessible role="switch".
 *
 * @attr checked   Toggled state
 * @attr disabled
 * @attr label     Optional text label rendered beside the track
 *
 * @slot default   Replaces label if no label attr is set
 * @fires forge-change  detail: { checked: boolean }
 */
@customElement('forge-toggle')
export class ForgeToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() label = '';

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
        cursor: not-allowed;
      }

      .track {
        position: relative;
        width: 36px;
        height: 20px;
        border-radius: var(--radius-full);
        background: var(--bg-elevated);
        border: 1px solid var(--border-strong);
        cursor: pointer;
        transition:
          background var(--duration-fast) ease,
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        flex-shrink: 0;
        outline: none;
      }

      .track:focus-visible {
        outline: 2px solid var(--forge);
        outline-offset: 2px;
      }

      :host([checked]) .track {
        background: var(--forge);
        border-color: var(--forge);
        box-shadow: 0 0 8px var(--forge-glow);
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--fg-3);
        transition:
          transform var(--duration-fast) ease,
          background var(--duration-fast) ease;
        pointer-events: none;
      }

      :host([checked]) .thumb {
        transform: translateX(16px);
        background: #fff;
      }

      .label {
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
        line-height: 1;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="track"
        role="switch"
        aria-checked="${this.checked}"
        tabindex="${this.disabled ? -1 : 0}"
        @click="${this._toggle}"
        @keydown="${this._onKeydown}"
        part="track"
      >
        <div class="thumb" part="thumb"></div>
      </div>
      ${this.label
        ? html`<span class="label" @click="${this._toggle}" part="label">${this.label}</span>`
        : html`<slot @click="${this._toggle}"></slot>`}
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('forge-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      })
    );
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toggle': ForgeToggle;
  }
}
