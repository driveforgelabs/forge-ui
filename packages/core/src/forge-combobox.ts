import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('forge-combobox')
export class ForgeCombobox extends LitElement {
  @property({ reflect: true }) value = '';
  @property() placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ attribute: false }) options: ComboboxOption[] = [];
  @property() label = '';

  @state() private _searchQuery = '';
  @state() private _open = false;

  @query('input') private _input!: HTMLInputElement;

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        font-family: var(--font-body);
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      label {
        font-size: 12px;
        font-weight: 500;
        color: var(--fg-2);
        letter-spacing: 0.03em;
        cursor: pointer;
      }

      .combobox-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

      input {
        width: 100%;
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-1);
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 9px 36px 9px 12px;
        outline: none;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
      }

      input::placeholder {
        color: var(--fg-3);
      }

      input:focus {
        border-color: var(--forge);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      input:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      /* Custom chevron */
      .chevron {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        width: 10px;
        height: 6px;
        color: var(--fg-3);
        transition: transform var(--duration-fast) ease;
      }

      .combobox-wrap[data-open="true"] .chevron {
        transform: translateY(-50%) rotate(180deg);
      }

      /* Dropdown List */
      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        z-index: 100;
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-sm);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        max-height: 240px;
        overflow-y: auto;
        padding: 4px 0;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;
        transition:
          opacity var(--duration-fast) ease,
          transform var(--duration-fast) ease;
      }

      .dropdown[data-open="true"] {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      .option {
        font-size: 13px;
        color: var(--fg-2);
        padding: 8px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: background var(--duration-fast) ease, color var(--duration-fast) ease;
      }

      .option:hover {
        background: var(--bg-elevated);
        color: var(--fg-1);
      }

      .option[data-selected="true"] {
        background: var(--forge-subtle);
        color: var(--fg-1);
        font-weight: 500;
      }

      .option[data-disabled="true"] {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }

      .no-results {
        font-size: 13px;
        color: var(--fg-3);
        padding: 8px 12px;
        text-align: center;
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

  private _onDocumentClick = (e: MouseEvent) => {
    if (!this._open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._closeDropdown();
    }
  };

  private _onDocumentKeydown = (e: KeyboardEvent) => {
    if (!this._open) return;
    if (e.key === 'Escape') {
      this._closeDropdown();
    }
  };

  private _handleFocus() {
    if (this.disabled) return;
    this._open = true;
    const selectedOpt = this.options.find((opt) => opt.value === this.value);
    this._searchQuery = selectedOpt ? selectedOpt.label : '';
    if (this._input) {
      this._input.value = this._searchQuery;
      this._input.select();
    }
  }

  private _handleInput(e: Event) {
    this._searchQuery = (e.target as HTMLInputElement).value;
    this._open = true;
  }

  private _closeDropdown() {
    this._open = false;
    const selectedOpt = this.options.find((opt) => opt.value === this.value);
    if (this._input) {
      this._input.value = selectedOpt ? selectedOpt.label : '';
    }
    this._searchQuery = '';
  }

  private _selectOption(opt: ComboboxOption) {
    if (opt.disabled) return;
    this.value = opt.value;
    this.dispatchEvent(
      new CustomEvent('forge-change', {
        bubbles: true,
        composed: true,
        detail: { value: opt.value },
      })
    );
    this._open = false;
    this._searchQuery = '';
    if (this._input) {
      this._input.value = opt.label;
      this._input.blur();
    }
  }

  render() {
    const id = `forge-combobox-${Math.random().toString(36).slice(2)}`;
    const selectedOpt = this.options.find((opt) => opt.value === this.value);
    const displayValue = this._open ? this._searchQuery : (selectedOpt ? selectedOpt.label : '');

    const filteredOptions = this.options.filter((opt) => {
      if (!this._searchQuery) return true;
      return opt.label.toLowerCase().includes(this._searchQuery.toLowerCase());
    });

    return html`
      <div class="field" part="field">
        ${this.label ? html`<label for="${id}" part="label">${this.label}</label>` : nothing}
        <div class="combobox-wrap" data-open="${this._open}">
          <input
            id="${id}"
            type="text"
            part="input"
            .value="${displayValue}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            @focus="${this._handleFocus}"
            @input="${this._handleInput}"
            autocomplete="off"
          />
          <svg class="chevron" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <div class="dropdown" data-open="${this._open}" part="dropdown">
            ${filteredOptions.length === 0
              ? html`<div class="no-results">No results found</div>`
              : filteredOptions.map(
                  (opt) => html`
                    <div
                      class="option"
                      role="option"
                      part="option"
                      data-selected="${opt.value === this.value}"
                      data-disabled="${opt.disabled ?? false}"
                      @click="${() => this._selectOption(opt)}"
                    >
                      <span>${opt.label}</span>
                      ${opt.value === this.value
                        ? html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="color: var(--forge);"><path d="M2.5 6L4.5 8L9.5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : nothing}
                    </div>
                  `
                )}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-combobox': ForgeCombobox;
  }
}
