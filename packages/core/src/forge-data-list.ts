import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type DataListLayout = 'horizontal' | 'vertical';

/**
 * `forge-data-list` — Styled Key-Value description list.
 *
 * @attr layout  horizontal | vertical (default: horizontal)
 * @slot default  Standard list tags, typically dt and dd elements
 */
@customElement('forge-data-list')
export class ForgeDataList extends LitElement {
  @property({ reflect: true }) layout: DataListLayout = 'horizontal';

  static styles = [
    css`
      :host {
        display: block;
        font-family: var(--font-body);
        box-sizing: border-box;
        width: 100%;
      }

      .data-list {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* Horizontal layout (grid-based alignment) */
      :host([layout='horizontal']) .data-list {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 8px 24px;
      }

      :host([layout='horizontal']) ::slotted(dt) {
        grid-column: 1;
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-3);
        margin: 0;
        align-self: center;
      }

      :host([layout='horizontal']) ::slotted(dd) {
        grid-column: 2;
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-1);
        margin: 0;
        align-self: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Vertical layout (stack-based layout) */
      :host([layout='vertical']) .data-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      :host([layout='vertical']) ::slotted(dt) {
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        color: var(--fg-3);
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      :host([layout='vertical']) ::slotted(dd) {
        font-family: var(--font-mono);
        font-size: 14px;
        font-weight: 600;
        color: var(--fg-1);
        margin: 0 0 8px 0;
      }

      :host([layout='vertical']) ::slotted(dd:last-of-type) {
        margin-bottom: 0;
      }
    `,
  ];

  render() {
    return html`
      <dl class="data-list" part="data-list">
        <slot></slot>
      </dl>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-data-list': ForgeDataList;
  }
}
