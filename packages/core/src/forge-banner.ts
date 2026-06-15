import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type BannerVariant = 'info' | 'warning' | 'error' | 'success';

@customElement('forge-banner')
export class ForgeBanner extends LitElement {
  @property({ reflect: true }) variant: BannerVariant = 'info';
  @property({ type: Boolean }) dismissible = false;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--font-body);
        box-sizing: border-box;
      }

      .banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 18px;
        border: 1px solid var(--border);
        border-left: 4px solid var(--border-active);
        border-radius: var(--radius-sm);
        background: var(--bg-surface);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        min-height: 48px;
        box-sizing: border-box;
      }

      .content-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        font-size: 14px;
        line-height: 1.5;
        color: var(--fg-1);
      }

      /* Icons or status elements */
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .close-btn {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: 4px;
        font-size: 14px;
        line-height: 1;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        transition: color var(--duration-fast) ease, background var(--duration-fast) ease;
        outline: none;
      }

      .close-btn:hover {
        color: var(--fg-1);
        background: var(--bg-elevated);
      }

      .close-btn:focus-visible {
        outline: 2px solid var(--forge);
      }

      /* Variants styling */
      :host([variant='info']) .banner {
        border-left-color: var(--data-blue);
        background: rgba(74, 158, 255, 0.04);
        border-color: rgba(74, 158, 255, 0.12);
      }
      :host([variant='info']) .icon { color: var(--data-blue); }

      :host([variant='warning']) .banner {
        border-left-color: var(--data-amber);
        background: rgba(245, 166, 35, 0.04);
        border-color: rgba(245, 166, 35, 0.12);
      }
      :host([variant='warning']) .icon { color: var(--data-amber); }

      :host([variant='error']) .banner {
        border-left-color: var(--data-red);
        background: rgba(229, 62, 62, 0.04);
        border-color: rgba(229, 62, 62, 0.12);
      }
      :host([variant='error']) .icon { color: var(--data-red); }

      :host([variant='success']) .banner {
        border-left-color: var(--data-green);
        background: rgba(34, 212, 122, 0.04);
        border-color: rgba(34, 212, 122, 0.12);
      }
      :host([variant='success']) .icon { color: var(--data-green); }

      ::slotted([slot='actions']) { display: contents; }
    `,
  ];

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('forge-dismiss', { bubbles: true, composed: true }));
    this.remove();
  }

  private _getIcon() {
    switch (this.variant) {
      case 'success':
        return html`
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 9L8 11L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case 'warning':
        return html`
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M9 12.5V12.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
      case 'error':
        return html`
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6.5 6.5L11.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        `;
      case 'info':
      default:
        return html`
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 12V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M9 6V6.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
    }
  }

  render() {
    return html`
      <div class="banner" role="alert" part="banner">
        <div class="content-wrap">
          <div class="icon">${this._getIcon()}</div>
          <slot></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
          ${this.dismissible
            ? html`<button class="close-btn" @click="${this._dismiss}" aria-label="Dismiss banner" part="close-btn">✕</button>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-banner': ForgeBanner;
  }
}
