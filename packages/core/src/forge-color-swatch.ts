import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-color-swatch` — Color picker/selector for alert rules and status coding.
 *
 * @attr colors   Array of hex/CSS color strings to display
 * @attr value    Currently selected color
 * @attr size     sm | md | lg  (default: md)
 *
 * @fires forge-change  detail: { color: string }
 */
@customElement('forge-color-swatch')
export class ForgeColorSwatch extends LitElement {
  @property({ type: Array }) colors: string[] = [
    '#C2410C', '#22D47A', '#F5A623', '#E53E3E', '#4A9EFF', '#A78BFA',
  ];
  @property({ reflect: true }) value = '';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  static styles = [
    css`
      :host { display: inline-flex; flex-wrap: wrap; gap: 6px; }

      :host([size='sm']) { gap: 4px; }
      :host([size='lg']) { gap: 8px; }

      .swatch {
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition:
          transform var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease,
          border-color var(--duration-fast) ease;
        outline: none;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host([size='sm']) .swatch { width: 18px; height: 18px; }
      :host([size='md']) .swatch { width: 24px; height: 24px; }
      :host([size='lg']) .swatch { width: 32px; height: 32px; }

      .swatch:hover { transform: scale(1.15); }

      .swatch[aria-pressed='true'] {
        border-color: rgba(255,255,255,0.7);
        box-shadow: 0 0 0 2px rgba(255,255,255,0.15);
        transform: scale(1.1);
      }

      .swatch:focus-visible {
        outline: 2px solid var(--forge);
        outline-offset: 2px;
      }

      .check {
        opacity: 0;
        pointer-events: none;
      }

      .swatch[aria-pressed='true'] .check { opacity: 1; }
    `,
  ];

  render() {
    return html`
      ${this.colors.map(color => html`
        <div
          class="swatch"
          style="background:${color}"
          role="radio"
          aria-pressed="${this.value === color}"
          aria-label="${color}"
          tabindex="0"
          @click="${() => this._pick(color)}"
          @keydown="${(e: KeyboardEvent) => e.key === ' ' || e.key === 'Enter' ? this._pick(color) : null}"
          part="swatch"
        >
          ${svg`
            <svg class="check" width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `}
        </div>
      `)}
    `;
  }

  private _pick(color: string) {
    this.value = color;
    this.dispatchEvent(
      new CustomEvent('forge-change', {
        bubbles: true,
        composed: true,
        detail: { color },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-color-swatch': ForgeColorSwatch;
  }
}
