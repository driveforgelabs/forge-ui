import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
export type SelectState = 'default' | 'success' | 'error';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * `forge-select` — DriveForge select / dropdown.
 *
 * @attr label
 * @attr name
 * @attr value
 * @attr state      default | success | error
 * @attr hint
 * @attr disabled
 * @attr placeholder
 * @prop options    Array<{value, label, disabled?}>
 *
 * @fires forge-change {value: string}
 */
@customElement('forge-select')
export class ForgeSelect extends LitElement {
  @property() label = '';
  @property() name = '';
  @property() value = '';
  @property({ reflect: true }) state: SelectState = 'default';
  @property() hint = '';
  @property() placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ attribute: false }) options: SelectOption[] = [];

  @query('select') private _select!: HTMLSelectElement;

  static styles = [
    css`
      :host { display: block; }

      .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      label {
        font-family: var(--label-family, var(--font-mono));
        font-size: var(--label-size, 10px);
        font-weight: var(--label-weight, 500);
        color: var(--fg-2);
        letter-spacing: var(--label-tracking, 0.12em);
        text-transform: uppercase;
        cursor: pointer;
      }

      .select-wrap {
        position: relative;
      }

      select {
        width: 100%;
        appearance: none;
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-1);
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 9px 36px 9px 12px;
        outline: none;
        cursor: pointer;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
      }

      select:focus {
        border-color: var(--forge);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      select:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      select option {
        background: var(--bg-elevated);
        color: var(--fg-1);
      }

      :host([state='success']) select { border-color: var(--data-green); }
      :host([state='success']) select:focus { box-shadow: 0 0 0 3px var(--data-green-dim); }

      :host([state='error']) select { border-color: var(--data-red); }
      :host([state='error']) select:focus { box-shadow: 0 0 0 3px var(--data-red-dim); }

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
      }

      .hint {
        font-size: 11px;
        color: var(--fg-3);
        line-height: 1.4;
      }
      :host([state='success']) .hint { color: var(--data-green); }
      :host([state='error'])   .hint { color: var(--data-red); }
    `,
  ];

  render() {
    const id = this.name || `forge-select-${Math.random().toString(36).slice(2)}`;
    return html`
      <div class="field" part="field">
        ${this.label ? html`<label for="${id}" part="label">${this.label}</label>` : nothing}
        <div class="select-wrap">
          <select
            id="${id}"
            part="select"
            name="${this.name}"
            ?disabled="${this.disabled}"
            @change="${this._onChange}"
          >
            ${this.placeholder ? html`<option value="" ?selected="${!this.value}" disabled>${this.placeholder}</option>` : nothing}
            ${this.options.map(
              (opt) => html`
                <option
                  value="${opt.value}"
                  ?selected="${opt.value === this.value}"
                  ?disabled="${opt.disabled ?? false}"
                >
                  ${opt.label}
                </option>
              `
            )}
          </select>
          <svg class="chevron" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M0 0l5 6 5-6z" fill="currentColor"/>
          </svg>
        </div>
        ${this.hint ? html`<span class="hint" part="hint" role="${this.state === 'error' ? 'alert' : 'status'}">${this.hint}</span>` : nothing}
      </div>
    `;
  }

  private _onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('forge-change', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  focus() {
    this._select?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-select': ForgeSelect;
  }
}
