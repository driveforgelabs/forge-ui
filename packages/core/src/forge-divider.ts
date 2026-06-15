import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `forge-divider` — Horizontal or vertical separator, optionally labelled.
 *
 * @attr label        Optional centred label text
 * @attr orientation  horizontal | vertical  (default: horizontal)
 * @attr strength     subtle | default | strong  (default: default)
 */
@customElement('forge-divider')
export class ForgeDivider extends LitElement {
  @property() label = '';
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) strength: 'subtle' | 'default' | 'strong' = 'default';

  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
      }

      :host([orientation='horizontal']) {
        flex-direction: row;
        width: 100%;
        height: auto;
      }

      :host([orientation='vertical']) {
        flex-direction: column;
        height: 100%;
        width: auto;
      }

      .line {
        flex: 1;
        background: var(--border);
      }

      :host([strength='subtle'])  .line { background: var(--border-subtle); }
      :host([strength='strong'])  .line { background: var(--border-strong); }

      :host([orientation='horizontal']) .line { height: 1px; }
      :host([orientation='vertical'])   .line { width: 1px; }

      .label-wrap {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--fg-3);
        -webkit-font-smoothing: antialiased;
      }

      :host([orientation='horizontal']) .label-wrap { padding: 0 10px; }
      :host([orientation='vertical'])   .label-wrap { padding: 10px 0; writing-mode: vertical-lr; }
    `,
  ];

  render() {
    const label = this.label || (this.querySelector('[slot]') ? true : false);
    return html`
      <div class="line" part="line-start"></div>
      ${label
        ? html`<span class="label-wrap" part="label">
            ${this.label}<slot></slot>
          </span>
          <div class="line" part="line-end"></div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-divider': ForgeDivider;
  }
}
