import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
/**
 * `forge-virtual-list` — Virtualized list for rendering huge (10k+) datasets without performance lag.
 *
 * @attr items       Array of items to render
 * @attr item-height Height of each item in pixels (default: 40)
 * @attr buffer      Number of off-screen items to render above/below viewport (default: 5)
 */
@customElement('forge-virtual-list')
export class ForgeVirtualList extends LitElement {
  @property({ type: Array }) items: any[] = [];
  @property({ type: Number, attribute: 'item-height' }) itemHeight = 40;
  @property({ type: Number }) buffer = 5;

  /**
   * Optional developer-defined render callback.
   * Signature: (item: any, index: number) => TemplateResult | string
   */
  @property({ attribute: false }) renderItem?: (item: any, index: number) => TemplateResult | string;

  @state() private _scrollTop = 0;
  @state() private _viewportHeight = 200; // sensible default before observation

  @query('.viewport') private _viewportEl?: HTMLDivElement;

  private _resizeObserver?: ResizeObserver;

  static styles = [
    css`
      :host {
        display: block;
        height: 100%;
        overflow: hidden;
        font-family: var(--font-body);
        box-sizing: border-box;
      }

      .viewport {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        position: relative;
        box-sizing: border-box;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        background: var(--bg-surface);
      }

      .spacer {
        width: 100%;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
      }

      .items-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        will-change: transform;
      }

      .item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.05));
        padding: 0 12px;
      }

      .fallback-item {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--fg-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: flex;
        gap: 16px;
      }

      .fallback-item span {
        display: inline-flex;
        gap: 4px;
      }

      .fallback-item strong {
        color: var(--fg-3);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this._viewportHeight = entry.contentRect.height || entry.target.clientHeight;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  firstUpdated() {
    if (this._viewportEl) {
      this._resizeObserver?.observe(this._viewportEl);
      this._viewportHeight = this._viewportEl.clientHeight || 200;
    }
  }

  private _handleScroll(e: Event) {
    const target = e.target as HTMLDivElement;
    this._scrollTop = target.scrollTop;
  }

  private _defaultRenderItem(item: any, index: number) {
    if (typeof item === 'object' && item !== null) {
      return html`
        <div class="fallback-item">
          <span><strong>idx:</strong>${index}</span>
          ${Object.entries(item).map(
            ([k, v]) => html`<span><strong>${k}:</strong>${String(v)}</span>`
          )}
        </div>
      `;
    }
    return html`
      <div class="fallback-item">
        <span><strong>idx:</strong>${index}</span>
        <span>${String(item)}</span>
      </div>
    `;
  }

  render() {
    const totalHeight = this.items.length * this.itemHeight;

    // Calculate visible range
    const startNode = Math.max(0, Math.floor(this._scrollTop / this.itemHeight) - this.buffer);
    const visibleCount = Math.ceil(this._viewportHeight / this.itemHeight);
    const endNode = Math.min(this.items.length, startNode + visibleCount + 2 * this.buffer);

    const visibleItems: any[] = [];
    for (let i = startNode; i < endNode; i++) {
      visibleItems.push({
        data: this.items[i],
        index: i,
      });
    }

    return html`
      <div class="viewport" @scroll="${this._handleScroll}" part="viewport">
        <div class="spacer" style="height: ${totalHeight}px;" part="spacer"></div>
        <div class="items-container" style="transform: translateY(${startNode * this.itemHeight}px);" part="items-container">
          ${visibleItems.map(({ data, index }) => html`
            <div class="item" style="height: ${this.itemHeight}px;" part="item item-${index}">
              ${this.renderItem
                ? this.renderItem(data, index)
                : this._defaultRenderItem(data, index)}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-virtual-list': ForgeVirtualList;
  }
}
