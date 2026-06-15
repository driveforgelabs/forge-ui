import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type SkeletonVariant = 'text' | 'circle' | 'rect';
export type SkeletonAnimation = 'pulse' | 'none';

@customElement('forge-skeleton')
export class ForgeSkeleton extends LitElement {
  @property({ reflect: true }) variant: SkeletonVariant = 'text';
  @property({ reflect: true }) animation: SkeletonAnimation = 'pulse';
  @property() width = '';
  @property() height = '';

  static styles = [
    css`
      :host {
        display: block;
        background: var(--bg-elevated);
        position: relative;
        overflow: hidden;
      }

      :host([variant='text']) {
        height: 1.2em;
        border-radius: var(--radius-xs);
        margin-bottom: 0.5em;
        width: 100%;
      }

      :host([variant='circle']) {
        border-radius: var(--radius-full);
        width: 40px;
        height: 40px;
      }

      :host([variant='rect']) {
        border-radius: var(--radius-sm);
        width: 100%;
        height: 150px;
      }

      /* Pulsing Animation */
      @keyframes pulse {
        0%, 100% {
          opacity: 0.6;
        }
        50% {
          opacity: 0.25;
        }
      }

      :host([animation='pulse']) {
        animation: pulse 1.5s ease-in-out infinite;
      }
    `,
  ];

  render() {
    const style = [];
    if (this.width) style.push(`width: ${this.width};`);
    if (this.height) style.push(`height: ${this.height};`);

    return html`<div style="${style.join(' ')}" part="skeleton"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skeleton': ForgeSkeleton;
  }
}
