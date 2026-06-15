import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * `forge-spinner` — Sleek high-performance spinning ring indicator.
 *
 * @attr size  sm | md | lg (default: md)
 */
@customElement('forge-spinner')
export class ForgeSpinner extends LitElement {
  @property({ reflect: true }) size: SpinnerSize = 'md';

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }

      .spinner {
        animation: rotate 1.4s linear infinite;
        color: var(--forge);
      }

      .path {
        stroke: currentColor;
        stroke-linecap: round;
        animation: dash 1.4s ease-in-out infinite;
      }

      :host([size='sm']) .spinner {
        width: 16px;
        height: 16px;
      }
      :host([size='sm']) .path {
        stroke-width: 2.5;
      }

      :host([size='md']) .spinner {
        width: 24px;
        height: 24px;
      }
      :host([size='md']) .path {
        stroke-width: 3;
      }

      :host([size='lg']) .spinner {
        width: 40px;
        height: 40px;
      }
      :host([size='lg']) .path {
        stroke-width: 4;
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }
    `,
  ];

  render() {
    return html`
      <svg class="spinner" viewBox="0 0 50 50" part="svg">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          part="circle"
        ></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-spinner': ForgeSpinner;
  }
}
