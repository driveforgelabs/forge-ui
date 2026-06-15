import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-checkbox` — Accessible checkbox with indeterminate support.
 *
 * @attr checked        Checked state
 * @attr indeterminate  Partial-select state (overrides checked visually)
 * @attr disabled
 * @attr label          Text label rendered beside the box
 *
 * @slot default  Replaces label if no label attr is set
 * @fires forge-change  detail: { checked: boolean }
 */
@customElement('forge-checkbox')
export class ForgeCheckbox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
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
      }

      .box {
        width: 16px;
        height: 16px;
        border-radius: var(--radius-xs);
        border: 1.5px solid var(--border-strong);
        background: var(--bg-elevated);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition:
          background var(--duration-fast) ease,
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        outline: none;
        cursor: pointer;
      }

      .box:focus-visible {
        outline: 2px solid var(--forge);
        outline-offset: 2px;
      }

      :host([checked]) .box,
      :host([indeterminate]) .box {
        background: var(--forge);
        border-color: var(--forge);
        box-shadow: 0 0 6px var(--forge-glow);
      }

      .icon { display: none; }
      :host([checked]) .icon.check { display: block; }
      :host([indeterminate]) .icon.dash { display: block; }
      :host([checked]) .icon.dash,
      :host([indeterminate]) .icon.check { display: none; }

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
        class="box"
        role="checkbox"
        aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
        tabindex="${this.disabled ? -1 : 0}"
        @click="${this._toggle}"
        @keydown="${this._onKeydown}"
        part="box"
      >
        ${svg`
          <svg class="icon check" width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `}
        ${svg`
          <svg class="icon dash" width="8" height="2" viewBox="0 0 8 2" fill="none">
            <path d="M1 1H7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        `}
      </div>
      ${this.label
        ? html`<span class="label" @click="${this._toggle}" part="label">${this.label}</span>`
        : html`<slot @click="${this._toggle}"></slot>`}
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
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
    if (e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-checkbox': ForgeCheckbox;
  }
}
