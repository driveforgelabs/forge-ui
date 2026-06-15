import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
export type InputState = 'default' | 'success' | 'error';

/**
 * `forge-input` — DriveForge text input with label, hint, and unit affixes.
 *
 * @attr label
 * @attr name
 * @attr type        text | number | password | email | search
 * @attr value
 * @attr placeholder
 * @attr state       default | success | error
 * @attr hint
 * @attr prefix      unit/symbol before the input (e.g. "±")
 * @attr suffix      unit/symbol after the input (e.g. "RPM")
 * @attr disabled
 * @attr required
 *
 * @fires forge-input  {value: string}
 * @fires forge-change {value: string}
 */
@customElement('forge-input')
export class ForgeInput extends LitElement {
  @property() label = '';
  @property() name = '';
  @property() type = 'text';
  @property() value = '';
  @property() placeholder = '';
  @property({ reflect: true }) state: InputState = 'default';
  @property() hint = '';
  @property() prefix = '';
  @property() suffix = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;

  @query('input') private _input!: HTMLInputElement;

  static styles = [
    css`
      :host {
        display: block;
      }

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

      .input-wrap {
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
        padding: 9px 12px;
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

      /* State variants */
      :host([state='success']) input {
        border-color: var(--data-green);
      }
      :host([state='success']) input:focus {
        box-shadow: 0 0 0 3px var(--data-green-dim);
      }

      :host([state='error']) input {
        border-color: var(--data-red);
      }
      :host([state='error']) input:focus {
        box-shadow: 0 0 0 3px var(--data-red-dim);
      }

      /* Prefix / suffix affixes */
      .affix {
        position: absolute;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--fg-3);
        pointer-events: none;
        line-height: 1;
      }

      .affix-prefix { left: 10px; }
      .affix-suffix { right: 10px; }

      .has-prefix input  { padding-left: 28px; }
      .has-suffix input  { padding-right: 38px; }

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
    const id = this.name || `forge-input-${Math.random().toString(36).slice(2)}`;
    const wrapClasses = [
      'input-wrap',
      this.prefix ? 'has-prefix' : '',
      this.suffix ? 'has-suffix' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="field" part="field">
        ${this.label
          ? html`<label for="${id}" part="label">${this.label}${this.required ? html`<span aria-hidden="true" style="color:var(--forge);margin-left:2px;">*</span>` : nothing}</label>`
          : nothing}
        <div class="${wrapClasses}">
          ${this.prefix ? html`<span class="affix affix-prefix" aria-hidden="true">${this.prefix}</span>` : nothing}
          <input
            id="${id}"
            part="input"
            type="${this.type}"
            name="${this.name}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this._onInput}"
            @change="${this._onChange}"
          />
          ${this.suffix ? html`<span class="affix affix-suffix" aria-hidden="true">${this.suffix}</span>` : nothing}
        </div>
        ${this.hint ? html`<span class="hint" part="hint" role="${this.state === 'error' ? 'alert' : 'status'}">${this.hint}</span>` : nothing}
      </div>
    `;
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('forge-input', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  private _onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('forge-change', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  focus() {
    this._input?.focus();
  }

  blur() {
    this._input?.blur();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-input': ForgeInput;
  }
}
