import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './forge-chip.js';

/**
 * `forge-tag-input` — Chips-inside-input for labeling.
 *
 * @attr tags         string[]
 * @attr placeholder  string
 * @attr disabled     boolean
 *
 * @fires forge-change  {tags: string[]}
 */
@customElement('forge-tag-input')
export class ForgeTagInput extends LitElement {
  @property({ type: Array }) tags: string[] = [];
  @property() placeholder = 'Add tag...';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _inputValue = '';

  static styles = [
    css`
      :host {
        display: block;
      }

      .tag-input-container {
        display: flex;
        align-items: center;
        min-height: 38px;
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 4px var(--space-2);
        box-sizing: border-box;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        cursor: text;
      }

      .tag-input-container:focus-within:not(.disabled) {
        border-color: var(--forge);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      .tag-input-container.disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      .chips-area {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        align-items: center;
        width: 100%;
      }

      .tag-chip {
        display: inline-flex;
        align-items: center;
      }

      .remove-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
        color: var(--fg-3);
        transition:
          color var(--duration-fast) ease,
          background-color var(--duration-fast) ease;
        width: 16px;
        height: 16px;
        border-radius: var(--radius-full);
      }

      .remove-btn:hover {
        color: var(--fg-1);
        background: rgba(255, 255, 255, 0.15);
      }

      input {
        flex: 1;
        min-width: 80px;
        background: transparent;
        border: none;
        outline: none;
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-1);
        padding: 4px 0;
        -webkit-font-smoothing: antialiased;
      }

      input::placeholder {
        color: var(--fg-3);
      }

      input:disabled {
        cursor: not-allowed;
      }
    `,
  ];

  private _focusInput(e: MouseEvent) {
    if (this.disabled) return;
    const target = e.target as HTMLElement;
    if (target.classList.contains('remove-btn') || target.closest('forge-chip')) {
      return;
    }
    this.shadowRoot?.querySelector('input')?.focus();
  }

  private _onInput(e: Event) {
    this._inputValue = (e.target as HTMLInputElement).value;
  }

  private _onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const val = this._inputValue.trim();
      if (val) {
        if (!this.tags.includes(val)) {
          this.tags = [...this.tags, val];
          this._inputValue = '';
          this.dispatchEvent(
            new CustomEvent('forge-change', {
              bubbles: true,
              composed: true,
              detail: { tags: this.tags },
            })
          );
        } else {
          // Reset input even if duplicate is entered
          this._inputValue = '';
        }
      }
    } else if (e.key === 'Backspace' && !this._inputValue && this.tags.length > 0) {
      this.tags = this.tags.slice(0, -1);
      this.dispatchEvent(
        new CustomEvent('forge-change', {
          bubbles: true,
          composed: true,
          detail: { tags: this.tags },
        })
      );
    }
  }

  private _removeTag(e: MouseEvent, tagToRemove: string) {
    e.stopPropagation();
    if (this.disabled) return;
    this.tags = this.tags.filter((t) => t !== tagToRemove);
    this.dispatchEvent(
      new CustomEvent('forge-change', {
        bubbles: true,
        composed: true,
        detail: { tags: this.tags },
      })
    );
  }

  render() {
    return html`
      <div
        class="tag-input-container ${this.disabled ? 'disabled' : ''}"
        part="container"
        @click="${this._focusInput}"
      >
        <div class="chips-area" part="chips-area">
          ${this.tags.map(
            (tag) => html`
              <forge-chip color="forge" variant="filled" class="tag-chip" part="chip">
                ${tag}
                <span
                  class="remove-btn"
                  part="remove-button"
                  @click="${(e: MouseEvent) => this._removeTag(e, tag)}"
                  >&times;</span
                >
              </forge-chip>
            `
          )}
          <input
            type="text"
            part="input"
            .placeholder="${this.tags.length === 0 ? this.placeholder : ''}"
            ?disabled="${this.disabled}"
            .value="${this._inputValue}"
            @input="${this._onInput}"
            @keydown="${this._onKeydown}"
          />
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tag-input': ForgeTagInput;
  }
}
