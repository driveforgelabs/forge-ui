import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type AlertVariant = 'info' | 'warning' | 'error' | 'success';

/**
 * `forge-alert` — Inline section-scoped alert box.
 *
 * @attr variant  info | warning | error | success (default: info)
 * @attr heading  Optional heading text for the alert
 * @slot default  The descriptive body/message
 * @slot icon     Optional custom icon (replaces the default variant icon)
 */
@customElement('forge-alert')
export class ForgeAlert extends LitElement {
  @property({ reflect: true }) variant: AlertVariant = 'info';
  @property() heading?: string;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--font-body);
        box-sizing: border-box;
      }

      .alert {
        display: flex;
        gap: 12px;
        padding: 12px 16px;
        border: 1px solid transparent;
        border-left: 4px solid;
        border-radius: var(--radius-md);
        box-sizing: border-box;
      }

      .icon-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 20px;
        height: 20px;
        margin-top: 2px;
        flex-shrink: 0;
      }

      ::slotted([slot='icon']) {
        width: 20px;
        height: 20px;
        display: block;
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        line-height: 1.5;
      }

      .heading {
        font-weight: 600;
        color: var(--fg-1);
      }

      .body {
        color: var(--fg-2);
      }

      /* Variants styling */
      :host([variant='info']) .alert {
        border-color: rgba(74, 158, 255, 0.12);
        background: rgba(74, 158, 255, 0.04);
        border-left-color: var(--data-blue);
      }
      :host([variant='info']) .icon-container {
        color: var(--data-blue);
      }

      :host([variant='warning']) .alert {
        border-color: rgba(245, 166, 35, 0.12);
        background: rgba(245, 166, 35, 0.04);
        border-left-color: var(--data-amber);
      }
      :host([variant='warning']) .icon-container {
        color: var(--data-amber);
      }

      :host([variant='error']) .alert {
        border-color: rgba(229, 62, 62, 0.12);
        background: rgba(229, 62, 62, 0.04);
        border-left-color: var(--data-red);
      }
      :host([variant='error']) .icon-container {
        color: var(--data-red);
      }

      :host([variant='success']) .alert {
        border-color: rgba(34, 212, 122, 0.12);
        background: rgba(34, 212, 122, 0.04);
        border-left-color: var(--data-green);
      }
      :host([variant='success']) .icon-container {
        color: var(--data-green);
      }
    `,
  ];

  private _getIcon() {
    switch (this.variant) {
      case 'success':
        return html`
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6.5 10L8.5 12L13.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case 'warning':
        return html`
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M10 13.5V13.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
      case 'error':
        return html`
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 7L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M13 7L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        `;
      case 'info':
      default:
        return html`
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 13V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M10 7V7.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
    }
  }

  render() {
    return html`
      <div class="alert" role="alert" part="alert">
        <div class="icon-container" part="icon-container">
          <slot name="icon">${this._getIcon()}</slot>
        </div>
        <div class="content" part="content">
          ${this.heading ? html`<div class="heading" part="heading">${this.heading}</div>` : nothing}
          <div class="body" part="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-alert': ForgeAlert;
  }
}
