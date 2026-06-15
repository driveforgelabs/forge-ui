import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * `forge-avatar` — Driver/team profile avatar with image loading and a mathematically
 * derived procedural gradient fallback for name initials.
 *
 * @attr name  The full name of the driver or team (e.g. "Max Verstappen")
 * @attr src   URL of the profile picture image
 * @attr size  sm | md | lg  (default: md)
 */
@customElement('forge-avatar')
export class ForgeAvatar extends LitElement {
  @property() name = '';
  @property() src = '';
  @property({ reflect: true }) size: AvatarSize = 'md';

  @state() private _hasError = false;

  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-full);
        border: 2px solid var(--border-strong);
        overflow: hidden;
        user-select: none;
        box-sizing: border-box;
        aspect-ratio: 1;
        width: 100%;
        height: 100%;
        transition: border-color var(--duration-fast) ease, transform var(--duration-fast) ease;
      }

      .avatar:hover {
        border-color: var(--forge-light);
        transform: scale(1.04);
      }

      :host([size='sm']) .avatar {
        width: 32px;
        height: 32px;
        border-width: 1.5px;
      }

      :host([size='md']) .avatar {
        width: 48px;
        height: 48px;
      }

      :host([size='lg']) .avatar {
        width: 64px;
        height: 64px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .initials {
        font-family: var(--font-display);
        font-weight: 700;
        color: var(--fg-1);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        -webkit-font-smoothing: antialiased;
      }

      :host([size='sm']) .initials {
        font-size: 11px;
      }

      :host([size='md']) .initials {
        font-size: 16px;
      }

      :host([size='lg']) .initials {
        font-size: 22px;
      }
    `,
  ];

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('src')) {
      this._hasError = false;
    }
  }

  private _getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    const first = parts[0][0] || '';
    const last = parts[parts.length - 1][0] || '';
    return (first + last).toUpperCase();
  }

  private _getGradient(name: string): string {
    if (!name) return 'linear-gradient(135deg, var(--bg-elevated), var(--bg-inset))';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h1 = Math.abs(hash) % 360;
    const h2 = (h1 + 45) % 360; // Beautiful harmonic color shift
    return `linear-gradient(135deg, hsl(${h1}, 75%, 45%), hsl(${h2}, 85%, 25%))`;
  }

  private _handleError() {
    this._hasError = true;
  }

  render() {
    const showImage = this.src && !this._hasError;
    const initials = this._getInitials(this.name);
    const gradient = this._getGradient(this.name);

    return html`
      <div
        class="avatar"
        part="avatar"
        style="${showImage ? '' : `background: ${gradient};`}"
      >
        ${showImage
          ? html`<img src="${this.src}" @error="${this._handleError}" alt="${this.name}" part="image" />`
          : html`<span class="initials" part="initials">${initials}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': ForgeAvatar;
  }
}
