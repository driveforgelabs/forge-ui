import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export interface ForgeNavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
  children?: ForgeNavItem[];
}

/**
 * `forge-sidebar-nav` — Collapsible icon + label navigation rail.
 *
 * @attr items       Array of nav items { id, label, icon?, href?, badge?, disabled?, children? }
 * @attr selected    Currently active item id
 * @attr collapsed   Collapse to icon-only rail
 * @attr brand       Brand text shown in header
 *
 * @fires forge-navigate  detail: { item }
 * @fires forge-collapse  detail: { collapsed: boolean }
 */
@customElement('forge-sidebar-nav')
export class ForgeSidebarNav extends LitElement {
  @property({ type: Array }) items: ForgeNavItem[] = [];
  @property({ reflect: true }) selected = '';
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property() brand = 'DriveForge';

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 220px;
        background: var(--bg-surface);
        border-right: 1px solid var(--border);
        transition: width var(--duration-base) ease;
        overflow: hidden;
        flex-shrink: 0;
      }

      :host([collapsed]) { width: 56px; }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 14px 14px 16px;
        border-bottom: 1px solid var(--border);
        flex-shrink: 0;
        min-height: 52px;
        overflow: hidden;
      }

      .brand {
        font-family: var(--font-display);
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--forge);
        white-space: nowrap;
        opacity: 1;
        transition: opacity var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
      }

      :host([collapsed]) .brand { opacity: 0; pointer-events: none; }

      .toggle {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: 4px;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--duration-fast) ease, background var(--duration-fast) ease;
        flex-shrink: 0;
        outline: none;
      }
      .toggle:hover { color: var(--fg-1); background: var(--bg-elevated); }
      .toggle:focus-visible { outline: 2px solid var(--forge); }

      nav {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 8px 0;
        scrollbar-width: thin;
        scrollbar-color: var(--border-strong) transparent;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 16px;
        font-family: var(--font-body);
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-2);
        cursor: pointer;
        white-space: nowrap;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        text-decoration: none;
        transition:
          color var(--duration-fast) ease,
          background var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
        border-left: 2px solid transparent;
        outline: none;
        position: relative;
      }

      .item:hover:not([aria-disabled='true']) {
        color: var(--fg-1);
        background: var(--bg-elevated);
      }

      .item[aria-current='page'],
      .item.active {
        color: var(--forge-light);
        background: var(--forge-subtle);
        border-left-color: var(--forge);
      }

      .item[aria-disabled='true'] {
        opacity: 0.38;
        cursor: not-allowed;
      }

      .item:focus-visible { outline: 2px solid var(--forge); outline-offset: -2px; }

      .icon {
        font-size: 16px;
        flex-shrink: 0;
        width: 20px;
        text-align: center;
        line-height: 1;
      }

      .item-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: 1;
        transition: opacity var(--duration-fast) ease;
      }

      :host([collapsed]) .item-label { opacity: 0; pointer-events: none; }

      .badge {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        background: var(--forge-subtle);
        color: var(--forge-light);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        opacity: 1;
        transition: opacity var(--duration-fast) ease;
      }

      :host([collapsed]) .badge { opacity: 0; }

      .group-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--fg-4);
        padding: 12px 16px 4px;
        white-space: nowrap;
        overflow: hidden;
        opacity: 1;
        transition: opacity var(--duration-fast) ease;
      }

      :host([collapsed]) .group-label { opacity: 0; }

      .children {
        padding-left: 28px;
        border-left: 1px solid var(--border);
        margin-left: 24px;
      }

      :host([collapsed]) .children { display: none; }

      .footer {
        border-top: 1px solid var(--border);
        padding: 8px 0;
        flex-shrink: 0;
      }
    `,
  ];

  render() {
    return html`
      <div class="header" part="header">
        <span class="brand" part="brand">${this.brand}</span>
        <button
          class="toggle"
          @click="${this._toggleCollapse}"
          aria-label="${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}"
          part="toggle"
        >
          ${this.collapsed
            ? html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
        </button>
      </div>

      <nav part="nav">
        ${this.items.map(item => this._renderItem(item))}
      </nav>

      <div class="footer" part="footer">
        <slot name="footer"></slot>
      </div>
    `;
  }

  private _renderItem(item: ForgeNavItem, nested = false): unknown {
    const isActive = this.selected === item.id;
    const tag = item.href ? 'a' : 'button';

    const inner = html`
      ${item.icon ? html`<span class="icon" part="icon">${item.icon}</span>` : nothing}
      <span class="item-label" part="item-label">${item.label}</span>
      ${item.badge != null ? html`<span class="badge" part="badge">${item.badge}</span>` : nothing}
    `;

    const el = item.href
      ? html`<a
          class="item ${isActive ? 'active' : ''}"
          href="${item.href}"
          aria-current="${isActive ? 'page' : nothing}"
          aria-disabled="${item.disabled ?? false}"
          title="${this.collapsed ? item.label : nothing}"
          @click="${(e: Event) => this._navigate(e, item)}"
          part="item"
        >${inner}</a>`
      : html`<button
          class="item ${isActive ? 'active' : ''}"
          aria-current="${isActive ? 'page' : nothing}"
          aria-disabled="${item.disabled ?? false}"
          title="${this.collapsed ? item.label : nothing}"
          @click="${(e: Event) => this._navigate(e, item)}"
          part="item"
        >${inner}</button>`;

    if (item.children?.length && !this.collapsed) {
      return html`
        ${el}
        <div class="children">${item.children.map(c => this._renderItem(c, true))}</div>
      `;
    }

    return el;
  }

  private _navigate(e: Event, item: ForgeNavItem) {
    if (item.disabled) { e.preventDefault(); return; }
    if (!item.href || item.href === '#') e.preventDefault();
    this.selected = item.id;
    this.dispatchEvent(
      new CustomEvent('forge-navigate', {
        bubbles: true,
        composed: true,
        detail: { item },
      })
    );
  }

  private _toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent('forge-collapse', {
        bubbles: true,
        composed: true,
        detail: { collapsed: this.collapsed },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-sidebar-nav': ForgeSidebarNav;
  }
}
