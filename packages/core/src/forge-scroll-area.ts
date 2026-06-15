import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-scroll-area` — Custom dark scrollbars wrapper.
 *
 * @attr scrollbar-visibility  'auto' | 'always' | 'hover'
 *
 * @slot default               scrollable content
 */
@customElement('forge-scroll-area')
export class ForgeScrollArea extends LitElement {
  @property({ type: String, attribute: 'scrollbar-visibility', reflect: true })
  scrollbarVisibility: 'auto' | 'always' | 'hover' = 'hover';

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        /* Default scrollbar thumb color variables */
        --scrollbar-thumb-color: var(--fg-3);
      }

      :host([scrollbar-visibility='always']) {
        --scrollbar-thumb-color: rgba(255, 255, 255, 0.2);
      }

      :host([scrollbar-visibility='auto']) {
        --scrollbar-thumb-color: rgba(255, 255, 255, 0.15);
      }

      :host([scrollbar-visibility='hover']) {
        --scrollbar-thumb-color: rgba(255, 255, 255, 0);
      }

      :host([scrollbar-visibility='hover']:hover) {
        --scrollbar-thumb-color: rgba(255, 255, 255, 0.25);
      }

      .scroll-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb-color) transparent;
        transition: scrollbar-color var(--duration-fast) ease;
      }

      /* Webkit-specific custom scrollbar styles */
      .scroll-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .scroll-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .scroll-container::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb-color);
        border-radius: var(--radius-full);
        border: 2px solid transparent;
        background-clip: padding-box;
        transition: background-color var(--duration-fast) ease;
      }

      .scroll-container::-webkit-scrollbar-thumb:hover {
        background-color: var(--forge) !important;
      }
    `,
  ];

  render() {
    return html`
      <div class="scroll-container" part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-scroll-area': ForgeScrollArea;
  }
}
