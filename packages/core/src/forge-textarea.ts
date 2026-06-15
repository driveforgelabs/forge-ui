import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
export type TextareaState = 'default' | 'success' | 'error';

/**
 * `forge-textarea` — DriveForge multi-line text input.
 *
 * @attr label
 * @attr name
 * @attr value
 * @attr placeholder
 * @attr rows       default 4
 * @attr state      default | success | error
 * @attr hint
 * @attr disabled
 * @attr resize     none | vertical | horizontal | both   (default: vertical)
 *
 * @fires forge-input  {value: string}
 * @fires forge-change {value: string}
 */
@customElement('forge-textarea')
export class ForgeTextarea extends LitElement {
  @property() label = '';
  @property() name = '';
  @property() value = '';
  @property() placeholder = '';
  @property({ type: Number }) rows = 4;
  @property({ reflect: true }) state: TextareaState = 'default';
  @property() hint = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  static styles = [
    css`
      :host { display: block; }

      .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      label {
        font-family: var(--font-body);
        font-size: 12px;
        font-weight: 500;
        color: var(--fg-2);
        letter-spacing: 0.03em;
        cursor: pointer;
      }

      textarea {
        width: 100%;
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--fg-1);
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 9px 12px;
        outline: none;
        line-height: 1.6;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
      }

      textarea::placeholder { color: var(--fg-3); }

      textarea:focus {
        border-color: var(--forge);
        box-shadow: 0 0 0 3px var(--forge-subtle);
      }

      textarea:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      :host([state='success']) textarea { border-color: var(--data-green); }
      :host([state='success']) textarea:focus { box-shadow: 0 0 0 3px var(--data-green-dim); }

      :host([state='error']) textarea { border-color: var(--data-red); }
      :host([state='error']) textarea:focus { box-shadow: 0 0 0 3px var(--data-red-dim); }

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
    const id = this.name || `forge-textarea-${Math.random().toString(36).slice(2)}`;
    return html`
      <div class="field" part="field">
        ${this.label ? html`<label for="${id}" part="label">${this.label}</label>` : nothing}
        <textarea
          id="${id}"
          part="textarea"
          name="${this.name}"
          rows="${this.rows}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          style="resize: ${this.resize};"
          @input="${this._onInput}"
          @change="${this._onChange}"
        >${this.value}</textarea>
        ${this.hint ? html`<span class="hint" part="hint" role="${this.state === 'error' ? 'alert' : 'status'}">${this.hint}</span>` : nothing}
      </div>
    `;
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('forge-input', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  private _onChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('forge-change', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  focus() {
    this._textarea?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-textarea': ForgeTextarea;
  }
}
