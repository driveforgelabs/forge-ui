import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * `forge-tooltip` — Hover/focus tooltip wrapper.
 *
 * Wraps any element and shows a tooltip on pointer enter or focus.
 *
 * @attr tip        Tooltip text content
 * @attr placement  top | bottom | left | right  (default: top)
 *
 * @slot default  The element to attach the tooltip to
 */
@customElement('forge-tooltip')
export class ForgeTooltip extends LitElement {
  @property() tip = '';
  @property({ reflect: true }) placement: TooltipPlacement = 'top';
  @state() private _visible = false;

  static styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .anchor {
        display: contents;
      }

      .tip {
        position: absolute;
        z-index: 200;
        pointer-events: none;
        background: var(--bg-elevated);
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-sm);
        padding: 5px 10px;
        font-family: var(--font-body);
        font-size: 12px;
        line-height: 1.4;
        color: var(--fg-1);
        white-space: nowrap;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity var(--duration-fast) ease;
        -webkit-font-smoothing: antialiased;
      }

      .tip.visible { opacity: 1; }

      /* ── Placement ─────────────────────────────────────────────── */

      /* top (default) */
      .tip {
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([placement='bottom']) .tip {
        top: calc(100% + 8px);
        bottom: auto;
        left: 50%;
        transform: translateX(-50%);
      }

      :host([placement='left']) .tip {
        right: calc(100% + 8px);
        left: auto;
        bottom: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([placement='right']) .tip {
        left: calc(100% + 8px);
        bottom: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      /* ── Arrows ────────────────────────────────────────────────── */
      .tip::after {
        content: '';
        position: absolute;
        border: 5px solid transparent;
      }

      /* top arrow (points down) */
      .tip::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: var(--border-strong);
      }

      :host([placement='bottom']) .tip::after {
        top: auto;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: transparent;
        border-bottom-color: var(--border-strong);
      }

      :host([placement='left']) .tip::after {
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        border-top-color: transparent;
        border-left-color: var(--border-strong);
      }

      :host([placement='right']) .tip::after {
        top: 50%;
        right: 100%;
        left: auto;
        transform: translateY(-50%);
        border-top-color: transparent;
        border-right-color: var(--border-strong);
      }
    `,
  ];

  render() {
    return html`
      <div
        class="anchor"
        @mouseenter="${() => (this._visible = true)}"
        @mouseleave="${() => (this._visible = false)}"
        @focusin="${() => (this._visible = true)}"
        @focusout="${() => (this._visible = false)}"
        part="anchor"
      >
        <slot></slot>
        <div
          class="tip ${this._visible ? 'visible' : ''}"
          role="tooltip"
          part="tip"
        >
          ${this.tip}<slot name="tip"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tooltip': ForgeTooltip;
  }
}
