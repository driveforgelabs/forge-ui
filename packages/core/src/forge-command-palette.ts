import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
export interface CommandItem {
  id: string;
  name: string;
  category?: string;
  shortcut?: string;
}

const DEFAULT_COMMANDS: CommandItem[] = [
  { id: 'dashboard', name: 'Go to Dashboard', category: 'Navigation', shortcut: 'G + D' },
  { id: 'telemetry', name: 'Open Live Telemetry', category: 'Navigation', shortcut: 'G + T' },
  { id: 'analysis', name: 'Analyze Session Data', category: 'Navigation', shortcut: 'G + A' },
  { id: 'settings', name: 'Open Settings', category: 'System', shortcut: '⌘ + ,' },
  { id: 'theme', name: 'Toggle Dark/Neon Mode', category: 'Appearance', shortcut: 'T + M' },
  { id: 'clear', name: 'Clear Cache & Reload', category: 'System', shortcut: '⇧ + R' },
  { id: 'help', name: 'Show Keyboard Shortcuts', category: 'Help', shortcut: '?' },
];

/**
 * `forge-command-palette` — ⌘K fast launch search and execution overlay.
 *
 * @attr open     Controls overlay visibility
 * @fires forge-select  Fired when a command is selected {detail: CommandItem}
 */
@customElement('forge-command-palette')
export class ForgeCommandPalette extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) commands: CommandItem[] = DEFAULT_COMMANDS;

  @state() private _searchQuery = '';
  @state() private _selectedIndex = 0;

  @query('input') private _inputElement!: HTMLInputElement | null;

  static styles = [
    css`
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(8, 8, 10, 0.85);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 10vh;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--duration-base) ease;
      }

      .backdrop.is-open {
        opacity: 1;
        pointer-events: all;
      }

      .panel {
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-lg);
        box-shadow: 0 32px 64px rgba(0, 0, 0, 0.8), 0 0 0 1px var(--border);
        width: 100%;
        max-width: 600px;
        max-height: 400px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(-20px);
        transition: transform var(--duration-base) cubic-bezier(0.16, 1, 0.3, 1);
      }

      .backdrop.is-open .panel {
        transform: translateY(0);
      }

      .search-header {
        display: flex;
        align-items: center;
        padding: var(--space-4);
        border-bottom: 1px solid var(--border);
        gap: var(--space-3);
      }

      .search-icon {
        color: var(--fg-3);
        flex-shrink: 0;
      }

      input {
        flex: 1;
        background: none;
        border: none;
        color: var(--fg-1);
        font-family: var(--font-body);
        font-size: 16px;
        outline: none;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }

      input::placeholder {
        color: var(--fg-3);
      }

      .esc-badge {
        font-family: var(--font-mono);
        font-size: 10px;
        padding: 2px 6px;
        background: var(--bg-elevated);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-xs);
        color: var(--fg-3);
        flex-shrink: 0;
      }

      .results {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-2);
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .empty-results {
        padding: var(--space-5);
        text-align: center;
        color: var(--fg-3);
        font-family: var(--font-body);
        font-size: 14px;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: background var(--duration-fast) ease;
        scroll-margin: var(--space-2);
      }

      .item.is-selected {
        background: var(--bg-elevated);
        box-shadow: inset 3px 0 0 var(--forge);
      }

      .item-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .item-name {
        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 500;
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
        transition: color var(--duration-fast) ease;
      }

      .item.is-selected .item-name {
        color: var(--forge-light);
      }

      .item-category {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--fg-3);
      }

      .item-shortcut {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--fg-3);
        flex-shrink: 0;
      }

      .item.is-selected .item-shortcut {
        color: var(--fg-2);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleGlobalKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleGlobalKeyDown);
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._searchQuery = '';
        this._selectedIndex = 0;
        // Focus the input in the next update cycle
        setTimeout(() => {
          this._inputElement?.focus();
        }, 50);
      }
    }
  }

  private _handleGlobalKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.open = !this.open;
    }
  };

  private _handleBackdropClick() {
    this.open = false;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._searchQuery = target.value;
    this._selectedIndex = 0;
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.open = false;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const count = this.filteredCommands.length;
      if (count > 0) {
        this._selectedIndex = (this._selectedIndex + 1) % count;
        this._scrollSelectedIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const count = this.filteredCommands.length;
      if (count > 0) {
        this._selectedIndex = (this._selectedIndex - 1 + count) % count;
        this._scrollSelectedIntoView();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = this.filteredCommands[this._selectedIndex];
      if (cmd) {
        this._selectCommand(cmd);
      }
    }
  }

  private _scrollSelectedIntoView() {
    const selectedEl = this.shadowRoot?.querySelector('.item.is-selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  private _selectCommand(cmd: CommandItem) {
    this.dispatchEvent(
      new CustomEvent('forge-select', {
        bubbles: true,
        composed: true,
        detail: cmd,
      })
    );
    this.open = false;
  }

  get filteredCommands(): CommandItem[] {
    const queryStr = this._searchQuery.toLowerCase().trim();
    if (!queryStr) return this.commands;
    return this.commands.filter(
      cmd =>
        cmd.name.toLowerCase().includes(queryStr) ||
        (cmd.category && cmd.category.toLowerCase().includes(queryStr))
    );
  }

  render() {
    return html`
      <div class="backdrop ${this.open ? 'is-open' : ''}" @click="${this._handleBackdropClick}">
        <div class="panel" @click="${(e: Event) => e.stopPropagation()}">
          <div class="search-header">
            <svg
              class="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Type a command or search..."
              .value="${this._searchQuery}"
              @input="${this._handleInput}"
              @keydown="${this._handleKeyDown}"
            />
            <span class="esc-badge">ESC</span>
          </div>

          <div class="results" role="listbox">
            ${this.filteredCommands.length === 0
              ? html`<div class="empty-results">No results found for "${this._searchQuery}"</div>`
              : this.filteredCommands.map((cmd, index) => {
                  const isSelected = index === this._selectedIndex;
                  return html`
                    <div
                      class="item ${isSelected ? 'is-selected' : ''}"
                      role="option"
                      aria-selected="${isSelected ? 'true' : 'false'}"
                      @click="${() => this._selectCommand(cmd)}"
                      @mouseenter="${() => (this._selectedIndex = index)}"
                    >
                      <div class="item-main">
                        <span class="item-name">${cmd.name}</span>
                        ${cmd.category ? html`<span class="item-category">${cmd.category}</span>` : ''}
                      </div>
                      ${cmd.shortcut ? html`<span class="item-shortcut">${cmd.shortcut}</span>` : ''}
                    </div>
                  `;
                })}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-command-palette': ForgeCommandPalette;
  }
}
