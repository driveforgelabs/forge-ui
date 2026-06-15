import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export interface ForgeBreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * `forge-breadcrumb` — Wayfinding trail for nested session → run → lap views.
 *
 * @attr items  Array of { label, href? }
 * @attr separator  Custom separator string (default: '/')
 *
 * @fires forge-navigate  detail: { item, index }  — fired when a linked crumb is clicked
 */
@customElement('forge-breadcrumb')
export class ForgeBreadcrumb extends LitElement {
  @property({ type: Array }) items: ForgeBreadcrumbItem[] = [];
  @property() separator = '/';

  static styles = [
    css`
      :host { display: block; }

      nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0;
      }

      ol {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        display: inline-flex;
        align-items: center;
      }

      .crumb {
        font-family: var(--font-body);
        font-size: 13px;
        color: var(--fg-2);
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
        transition: color var(--duration-fast) ease;
        background: none;
        border: none;
        padding: 0;
        cursor: default;
      }

      a.crumb {
        cursor: pointer;
        color: var(--fg-2);
      }

      a.crumb:hover { color: var(--fg-1); }

      li:last-child .crumb {
        color: var(--fg-1);
        font-weight: 500;
        pointer-events: none;
      }

      .sep {
        margin: 0 8px;
        color: var(--fg-4);
        font-family: var(--font-mono);
        font-size: 12px;
        user-select: none;
      }
    `,
  ];

  render() {
    return html`
      <nav aria-label="Breadcrumb" part="nav">
        <ol part="list">
          ${this.items.map((item, i) => html`
            <li part="item">
              ${item.href
                ? html`<a
                    class="crumb"
                    href="${item.href}"
                    aria-current="${i === this.items.length - 1 ? 'page' : nothing}"
                    @click="${(e: Event) => this._navigate(e, item, i)}"
                    part="crumb"
                  >${item.label}</a>`
                : html`<span class="crumb" aria-current="${i === this.items.length - 1 ? 'page' : nothing}" part="crumb">${item.label}</span>`}
              ${i < this.items.length - 1
                ? html`<span class="sep" aria-hidden="true" part="sep">${this.separator}</span>`
                : ''}
            </li>
          `)}
        </ol>
      </nav>
    `;
  }

  private _navigate(e: Event, item: ForgeBreadcrumbItem, index: number) {
    if (!item.href || item.href === '#') e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('forge-navigate', {
        bubbles: true,
        composed: true,
        detail: { item, index },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumb': ForgeBreadcrumb;
  }
}
