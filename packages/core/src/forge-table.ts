import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type TableOptions,
  type TableOptionsResolved,
} from '@tanstack/table-core';
export type { ColumnDef };

/**
 * `forge-table` — Sortable, paginated data table powered by TanStack Table Core.
 *
 * @attr columns     ColumnDef<TData>[] — TanStack column definitions
 * @attr data        Row data array
 * @attr sortable    Enable column sorting (default: true)
 * @attr paginate    Enable pagination footer (default: false)
 * @attr page-size   Rows per page when paginated (default: 10)
 * @attr loading     Show loading skeleton
 * @attr empty-text  Message shown when data is empty
 *
 * @fires forge-sort    detail: { columnId, desc }
 * @fires forge-page    detail: { pageIndex, pageSize }
 * @fires forge-row-click  detail: { row, index }
 */
@customElement('forge-table')
export class ForgeTable<TData = Record<string, unknown>> extends LitElement {
  @property({ type: Array }) columns: ColumnDef<TData>[] = [];
  @property({ type: Array }) data: TData[] = [];
  @property({ type: Boolean }) sortable = true;
  @property({ type: Boolean }) paginate = false;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  @property({ type: Boolean }) loading = false;
  @property({ attribute: 'empty-text' }) emptyText = 'No data';

  @state() private _sorting: SortingState = [];
  @state() private _pagination: PaginationState = { pageIndex: 0, pageSize: 10 };
  @state() private _globalFilter = '';

  static styles = [
    css`
      :host { display: block; }

      .wrapper {
        width: 100%;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--border-strong) transparent;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--font-body);
        font-size: 13px;
        -webkit-font-smoothing: antialiased;
      }

      thead { background: var(--bg-elevated); }

      th {
        padding: 10px 14px;
        text-align: left;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--fg-3);
        border-bottom: 1px solid var(--border);
        white-space: nowrap;
        user-select: none;
      }

      th.sortable {
        cursor: pointer;
        transition: color var(--duration-fast) ease;
      }

      th.sortable:hover { color: var(--fg-1); }

      th.sorted { color: var(--forge); }

      .sort-icon {
        display: inline-flex;
        flex-direction: column;
        gap: 1px;
        margin-left: 4px;
        vertical-align: middle;
        opacity: 0.4;
      }

      th.sortable:hover .sort-icon { opacity: 0.7; }
      th.sorted .sort-icon { opacity: 1; }

      td {
        padding: 10px 14px;
        color: var(--fg-1);
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td { border-bottom: none; }

      tbody tr {
        transition: background var(--duration-fast) ease;
        cursor: default;
      }

      tbody tr:hover { background: var(--bg-elevated); }
      tbody tr.clickable { cursor: pointer; }
      tbody tr.clickable:hover { background: rgba(240,77,0,0.06); }

      .empty {
        text-align: center;
        padding: 40px 20px;
        color: var(--fg-3);
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.06em;
      }

      /* ── Skeleton ─────────────────────────────────────────────── */
      .skel {
        height: 12px;
        border-radius: var(--radius-xs);
        background: linear-gradient(
          90deg,
          var(--bg-elevated) 25%,
          var(--bg-surface) 50%,
          var(--bg-elevated) 75%
        );
        background-size: 400% 100%;
        animation: shimmer 1.4s ease infinite;
      }

      @keyframes shimmer {
        0%   { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }

      /* ── Pagination ───────────────────────────────────────────── */
      .pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border-top: 1px solid var(--border);
        background: var(--bg-elevated);
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--fg-2);
      }

      .page-info { color: var(--fg-3); }

      .page-btns { display: flex; gap: 4px; align-items: center; }

      .page-btn {
        background: none;
        border: 1px solid var(--border);
        color: var(--fg-2);
        padding: 4px 8px;
        border-radius: var(--radius-xs);
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: 11px;
        transition: background var(--duration-fast) ease, color var(--duration-fast) ease;
        outline: none;
      }

      .page-btn:hover:not(:disabled) { background: var(--bg-surface); color: var(--fg-1); }
      .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
      .page-btn.active { background: var(--forge-subtle); color: var(--forge-light); border-color: var(--forge); }
      .page-btn:focus-visible { outline: 2px solid var(--forge); }
    `,
  ];

  private _buildTable() {
    this._pagination = { ...this._pagination, pageSize: this.pageSize };

    const opts: TableOptions<TData> = {
      data: this.data,
      columns: this.columns,
      state: {
        sorting: this._sorting,
        pagination: this._pagination,
        globalFilter: this._globalFilter,
        columnPinning: {},
        columnSizing: {},
        columnSizingInfo: {
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          isResizingColumn: false,
          columnSizingStart: [],
        },
        columnVisibility: {},
        columnOrder: [],
        grouping: [],
        expanded: {},
        rowPinning: {},
        rowSelection: {},
      },
      onSortingChange: (updater) => {
        this._sorting = typeof updater === 'function' ? updater(this._sorting) : updater;
        const first = this._sorting[0];
        if (first) {
          this.dispatchEvent(
            new CustomEvent('forge-sort', { bubbles: true, composed: true, detail: { columnId: first.id, desc: first.desc } })
          );
        }
      },
      onPaginationChange: (updater) => {
        this._pagination = typeof updater === 'function' ? updater(this._pagination) : updater;
        this.dispatchEvent(
          new CustomEvent('forge-page', { bubbles: true, composed: true, detail: { ...this._pagination } })
        );
      },
      onGlobalFilterChange: (v) => { this._globalFilter = v; },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: this.sortable ? getSortedRowModel() : undefined,
      getPaginationRowModel: this.paginate ? getPaginationRowModel() : undefined,
      getFilteredRowModel: getFilteredRowModel(),
      onStateChange: () => {},
      manualPagination: false,
      manualSorting: false,
    };

    return createTable(opts as TableOptionsResolved<TData>);
  }

  render() {
    const table = this._buildTable();
    const rows = table.getRowModel().rows;
    const headerGroups = table.getHeaderGroups();

    return html`
      <div class="wrapper" part="wrapper">
        <table part="table">
          <thead part="thead">
            ${headerGroups.map(hg => html`
              <tr>
                ${hg.headers.map(header => {
                  const canSort = this.sortable && header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return html`
                    <th
                      class="${canSort ? 'sortable' : ''} ${sorted ? 'sorted' : ''}"
                      @click="${canSort ? () => header.column.toggleSorting() : nothing}"
                      part="th"
                      style="${header.getSize() !== 150 ? `width:${header.getSize()}px` : ''}"
                    >
                      ${header.isPlaceholder
                        ? nothing
                        : header.column.columnDef.header as string}
                      ${canSort ? html`
                        <span class="sort-icon" aria-hidden="true">
                          ${sorted === 'asc'
                            ? html`<svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 1L7 6H1L4 1Z" fill="currentColor"/></svg>`
                            : sorted === 'desc'
                            ? html`<svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 7L1 2H7L4 7Z" fill="currentColor"/></svg>`
                            : html`<svg width="8" height="10" viewBox="0 0 8 10"><path d="M4 1L7 4H1L4 1Z" fill="currentColor" opacity=".5"/><path d="M4 9L1 6H7L4 9Z" fill="currentColor" opacity=".5"/></svg>`}
                        </span>
                      ` : nothing}
                    </th>
                  `;
                })}
              </tr>
            `)}
          </thead>

          <tbody part="tbody">
            ${this.loading
              ? Array.from({ length: 5 }).map(() => html`
                  <tr>
                    ${headerGroups[0]?.headers.map(() => html`
                      <td><div class="skel" style="width:${60 + Math.random() * 40}%"></div></td>
                    `)}
                  </tr>
                `)
              : rows.length
                ? rows.map((row, i) => html`
                    <tr
                      class="clickable"
                      @click="${() => this._rowClick(row.original, i)}"
                      part="tr"
                    >
                      ${row.getVisibleCells().map(cell => html`
                        <td part="td">
                          ${cell.column.columnDef.cell
                            ? (cell.column.columnDef.cell as (ctx: unknown) => unknown)({ getValue: () => cell.getValue(), row: cell.row })
                            : cell.getValue() as unknown ?? ''}
                        </td>
                      `)}
                    </tr>
                  `)
                : html`
                    <tr>
                      <td colspan="${headerGroups[0]?.headers.length ?? 1}" class="empty" part="empty">
                        ${this.emptyText}
                      </td>
                    </tr>
                  `}
          </tbody>
        </table>

        ${this.paginate ? this._renderPagination(table) : nothing}
      </div>
    `;
  }

  private _renderPagination(table: ReturnType<typeof createTable<TData>>) {
    const pi = table.getState().pagination.pageIndex;
    const count = table.getPageCount();
    const canPrev = table.getCanPreviousPage();
    const canNext = table.getCanNextPage();
    const total = this.data.length;
    const ps = this._pagination.pageSize;
    const from = pi * ps + 1;
    const to = Math.min((pi + 1) * ps, total);

    // Show up to 5 page number buttons
    const pages: number[] = [];
    const start = Math.max(0, Math.min(pi - 2, count - 5));
    for (let i = start; i < Math.min(start + 5, count); i++) pages.push(i);

    return html`
      <div class="pagination" part="pagination">
        <span class="page-info">${from}–${to} of ${total}</span>
        <div class="page-btns">
          <button class="page-btn" ?disabled="${!canPrev}" @click="${() => table.previousPage()}" aria-label="Previous page">‹</button>
          ${pages.map(p => html`
            <button
              class="page-btn ${p === pi ? 'active' : ''}"
              @click="${() => table.setPageIndex(p)}"
            >${p + 1}</button>
          `)}
          <button class="page-btn" ?disabled="${!canNext}" @click="${() => table.nextPage()}" aria-label="Next page">›</button>
        </div>
      </div>
    `;
  }

  private _rowClick(row: TData, index: number) {
    this.dispatchEvent(
      new CustomEvent('forge-row-click', {
        bubbles: true,
        composed: true,
        detail: { row, index },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-table': ForgeTable;
  }
}
