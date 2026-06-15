import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export interface ForgeTabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

/**
 * `forge-tabs` — Keyboard-navigable tab bar.
 *
 * @attr tabs      Array of { id, label, badge?, disabled? }
 * @attr selected  Currently selected tab id
 *
 * @slot default   Tab panel content (manage visibility yourself via `selected`)
 * @fires forge-tab-change  detail: { id: string }
 */
@customElement('forge-tabs')
export class ForgeTabs extends LitElement {
  @property({ type: Array }) tabs: ForgeTabItem[] = [];
  @property({ reflect: true }) selected = '';

  static styles = [
    css`
      :host { display: block; }

      .tablist {
        display: flex;
        border-bottom: 1px solid var(--border);
        gap: 0;
      }

      .tab {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        font-family: var(--font-body);
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-2);
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        cursor: pointer;
        transition:
          color var(--duration-fast) ease,
          border-color var(--duration-fast) ease;
        outline: none;
        white-space: nowrap;
        -webkit-font-smoothing: antialiased;
      }

      .tab:hover:not([aria-disabled='true']) { color: var(--fg-1); }

      .tab[aria-selected='true'] {
        color: var(--fg-1);
        border-bottom-color: var(--forge);
      }

      .tab:focus-visible {
        outline: 2px solid var(--forge);
        outline-offset: -2px;
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }

      .tab[aria-disabled='true'] {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        background: var(--bg-elevated);
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--fg-2);
        line-height: 1;
      }

      .tab[aria-selected='true'] .badge {
        background: var(--forge-subtle);
        color: var(--forge-light);
      }
    `,
  ];

  render() {
    return html`
      <div class="tablist" role="tablist" part="tablist">
        ${this.tabs.map((tab, i) => html`
          <button
            class="tab"
            role="tab"
            id="tab-${tab.id}"
            aria-selected="${this.selected === tab.id}"
            aria-disabled="${tab.disabled ?? false}"
            tabindex="${this.selected === tab.id ? 0 : -1}"
            data-id="${tab.id}"
            @click="${() => this._select(tab)}"
            @keydown="${(e: KeyboardEvent) => this._onKeydown(e, i)}"
            part="tab"
          >
            ${tab.label}
            ${tab.badge != null
              ? html`<span class="badge" part="badge">${tab.badge}</span>`
              : ''}
          </button>
        `)}
      </div>
      <slot></slot>
    `;
  }

  private _select(tab: ForgeTabItem) {
    if (tab.disabled) return;
    this.selected = tab.id;
    this.dispatchEvent(
      new CustomEvent('forge-tab-change', {
        bubbles: true,
        composed: true,
        detail: { id: tab.id },
      })
    );
  }

  private _onKeydown(e: KeyboardEvent, index: number) {
    const enabled = this.tabs.filter(t => !t.disabled);
    const cur = enabled.findIndex(t => t.id === this.tabs[index].id);
    if (cur < 0) return;

    let next = -1;
    if (e.key === 'ArrowRight') next = (cur + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') next = (cur - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;

    if (next >= 0) {
      e.preventDefault();
      this._select(enabled[next]);
      const newIdx = this.tabs.findIndex(t => t.id === enabled[next].id);
      const buttons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.tab');
      buttons?.[newIdx]?.focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tabs': ForgeTabs;
  }
}
