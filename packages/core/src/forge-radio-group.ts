import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export interface ForgeRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * `forge-radio-group` — Grouped mutually exclusive radio options.
 *
 * @attr options    Array of { value, label, disabled? }
 * @attr value      Currently selected value
 * @attr name       Input group name (for form association)
 * @attr orientation  horizontal | vertical  (default: vertical)
 *
 * @fires forge-change  detail: { value: string }
 */
@customElement('forge-radio-group')
export class ForgeRadioGroup extends LitElement {
  @property({ type: Array }) options: ForgeRadioOption[] = [];
  @property({ reflect: true }) value = '';
  @property() name = 'radio-group';
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  static styles = [
    css`
      :host { display: block; }

      .group {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      :host([orientation='horizontal']) .group {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
      }

      .option {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }

      .option[aria-disabled='true'] {
        opacity: 0.38;
        pointer-events: none;
      }

      .ring {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1.5px solid var(--border-strong);
        background: var(--bg-elevated);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition:
          border-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        outline: none;
      }

      .ring:focus-visible {
        outline: 2px solid var(--forge);
        outline-offset: 2px;
      }

      .option[aria-checked='true'] .ring {
        border-color: var(--forge);
        box-shadow: 0 0 6px var(--forge-glow);
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--forge);
        opacity: 0;
        transform: scale(0.4);
        transition:
          opacity var(--duration-fast) ease,
          transform var(--duration-fast) ease;
      }

      .option[aria-checked='true'] .dot {
        opacity: 1;
        transform: scale(1);
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
      <div class="group" role="radiogroup" part="group">
        ${this.options.map((opt, i) => html`
          <div
            class="option"
            role="radio"
            aria-checked="${this.value === opt.value}"
            aria-disabled="${opt.disabled ?? false}"
            tabindex="${this.value === opt.value ? 0 : (i === 0 && !this.value ? 0 : -1)}"
            @click="${() => this._select(opt)}"
            @keydown="${(e: KeyboardEvent) => this._onKeydown(e, i)}"
            part="option"
          >
            <div class="ring" part="ring">
              <div class="dot" part="dot"></div>
            </div>
            <span class="label" part="label">${opt.label}</span>
          </div>
        `)}
      </div>
    `;
  }

  private _select(opt: ForgeRadioOption) {
    if (opt.disabled) return;
    this.value = opt.value;
    this.dispatchEvent(
      new CustomEvent('forge-change', {
        bubbles: true,
        composed: true,
        detail: { value: opt.value },
      })
    );
  }

  private _onKeydown(e: KeyboardEvent, index: number) {
    const enabled = this.options.filter(o => !o.disabled);
    const cur = enabled.findIndex(o => o.value === this.options[index].value);

    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (cur + 1) % enabled.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (cur - 1 + enabled.length) % enabled.length;

    if (next >= 0) {
      e.preventDefault();
      this._select(enabled[next]);
      const newIdx = this.options.findIndex(o => o.value === enabled[next].value);
      const items = this.shadowRoot?.querySelectorAll<HTMLElement>('.option');
      items?.[newIdx]?.focus();
    } else if (e.key === ' ') {
      e.preventDefault();
      this._select(this.options[index]);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio-group': ForgeRadioGroup;
  }
}
