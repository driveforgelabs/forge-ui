import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * `forge-split-pane` — Resizable split panels with a drag handle.
 *
 * @attr direction           'horizontal' | 'vertical'
 * @attr primary-min-size    number (pixels)
 * @attr secondary-min-size  number (pixels)
 * @attr split               number (percentage, 0-100)
 *
 * @slot primary             content for the first/top panel
 * @slot secondary           content for the second/bottom panel
 *
 * @fires forge-split-change {split: number}
 */
@customElement('forge-split-pane')
export class ForgeSplitPane extends LitElement {
  @property({ type: String, reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number, attribute: 'primary-min-size' }) primaryMinSize = 100;
  @property({ type: Number, attribute: 'secondary-min-size' }) secondaryMinSize = 100;
  @property({ type: Number, reflect: true }) split = 50;

  @state() private _isDragging = false;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .container {
        display: flex;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .container.horizontal {
        flex-direction: row;
      }

      .container.vertical {
        flex-direction: column;
      }

      .panel {
        box-sizing: border-box;
        overflow: auto;
        position: relative;
      }

      .primary-panel {
        flex-shrink: 0;
      }

      .secondary-panel {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
      }

      .container.horizontal > .primary-panel {
        width: var(--split-pos, 50%);
        height: 100%;
      }

      .container.horizontal > .secondary-panel {
        height: 100%;
      }

      .container.vertical > .primary-panel {
        height: var(--split-pos, 50%);
        width: 100%;
      }

      .container.vertical > .secondary-panel {
        width: 100%;
      }

      .divider {
        box-sizing: border-box;
        position: relative;
        background: var(--border-strong);
        transition:
          background-color var(--duration-fast) ease,
          box-shadow var(--duration-fast) ease;
        z-index: 10;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .container.horizontal > .divider {
        width: 6px;
        height: 100%;
        cursor: col-resize;
      }

      .container.vertical > .divider {
        height: 6px;
        width: 100%;
        cursor: row-resize;
      }

      .divider::after {
        content: '';
        position: absolute;
        background: var(--fg-3);
        border-radius: var(--radius-full);
        transition: background-color var(--duration-fast) ease;
      }

      .container.horizontal > .divider::after {
        width: 2px;
        height: 24px;
      }

      .container.vertical > .divider::after {
        width: 24px;
        height: 2px;
      }

      .divider:hover,
      .divider.active {
        background: var(--forge);
        box-shadow: var(--shadow-forge);
      }

      .divider:hover::after,
      .divider.active::after {
        background: var(--fg-1);
      }

      .container.dragging {
        user-select: none;
      }

      .container.dragging.horizontal {
        cursor: col-resize;
      }

      .container.dragging.vertical {
        cursor: row-resize;
      }

      .container.dragging .panel {
        pointer-events: none;
      }
    `,
  ];

  private _boundOnMouseMove = this._onMouseMove.bind(this);
  private _boundOnMouseUp = this._onMouseUp.bind(this);
  private _boundOnTouchMove = this._onTouchMove.bind(this);
  private _boundOnTouchEnd = this._onTouchEnd.bind(this);

  private _onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    this._startDragging();
  }

  private _onTouchStart(e: TouchEvent) {
    this._startDragging();
  }

  private _startDragging() {
    this._isDragging = true;
    window.addEventListener('mousemove', this._boundOnMouseMove);
    window.addEventListener('mouseup', this._boundOnMouseUp);
    window.addEventListener('touchmove', this._boundOnTouchMove, { passive: false });
    window.addEventListener('touchend', this._boundOnTouchEnd);
  }

  private _onMouseMove(e: MouseEvent) {
    this._handleMove(e.clientX, e.clientY);
  }

  private _onTouchMove(e: TouchEvent) {
    if (e.touches.length === 0) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    this._handleMove(touch.clientX, touch.clientY);
  }

  private _onMouseUp() {
    this._stopDragging();
  }

  private _onTouchEnd() {
    this._stopDragging();
  }

  private _stopDragging() {
    if (!this._isDragging) return;
    this._isDragging = false;
    window.removeEventListener('mousemove', this._boundOnMouseMove);
    window.removeEventListener('mouseup', this._boundOnMouseUp);
    window.removeEventListener('touchmove', this._boundOnTouchMove);
    window.removeEventListener('touchend', this._boundOnTouchEnd);
  }

  private _handleMove(clientX: number, clientY: number) {
    const rect = this.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    let newSplit = 50;

    if (this.direction === 'horizontal') {
      const offsetPx = clientX - rect.left;
      const minPercent = (this.primaryMinSize / rect.width) * 100;
      const maxPercent = 100 - (this.secondaryMinSize / rect.width) * 100;

      const percent = (offsetPx / rect.width) * 100;
      newSplit = Math.max(minPercent, Math.min(maxPercent, percent));
    } else {
      const offsetPx = clientY - rect.top;
      const minPercent = (this.primaryMinSize / rect.height) * 100;
      const maxPercent = 100 - (this.secondaryMinSize / rect.height) * 100;

      const percent = (offsetPx / rect.height) * 100;
      newSplit = Math.max(minPercent, Math.min(maxPercent, percent));
    }

    newSplit = Math.round(newSplit * 100) / 100;

    if (newSplit !== this.split) {
      this.split = newSplit;
      this.dispatchEvent(
        new CustomEvent('forge-split-change', {
          bubbles: true,
          composed: true,
          detail: { split: this.split },
        })
      );
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopDragging();
  }

  render() {
    return html`
      <div
        class="container ${this.direction} ${this._isDragging ? 'dragging' : ''}"
        style="--split-pos: ${this.split}%"
        part="container"
      >
        <div class="panel primary-panel" part="primary">
          <slot name="primary"></slot>
        </div>
        <div
          class="divider ${this._isDragging ? 'active' : ''}"
          part="divider"
          @mousedown="${this._onMouseDown}"
          @touchstart="${this._onTouchStart}"
        ></div>
        <div class="panel secondary-panel" part="secondary">
          <slot name="secondary"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-pane': ForgeSplitPane;
  }
}
