import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * `forge-file-upload` — Drag-and-drop file import zone.
 *
 * @attr accept     string
 * @attr multiple   boolean
 * @attr disabled   boolean
 *
 * @slot default    instructional text/icons
 * @fires forge-file-select  {files: File[]}
 */
@customElement('forge-file-upload')
export class ForgeFileUpload extends LitElement {
  @property() accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _isDragging = false;

  static styles = [
    css`
      :host {
        display: block;
      }

      .upload-zone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        min-height: 160px;
        border: 2px dashed var(--border-strong);
        border-radius: var(--radius-lg);
        background: var(--bg-surface);
        padding: var(--space-6);
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        transition:
          border-color var(--duration-base) ease,
          background-color var(--duration-base) ease,
          transform var(--duration-base) ease,
          box-shadow var(--duration-base) ease;
        user-select: none;
      }

      .upload-zone:hover:not(.disabled) {
        border-color: var(--forge);
        background: rgba(240, 77, 0, 0.02);
      }

      .upload-zone.dragging:not(.disabled) {
        border-color: var(--forge);
        background: var(--forge-subtle);
        transform: scale(1.02);
        box-shadow: var(--shadow-forge);
      }

      .upload-zone.disabled {
        opacity: 0.38;
        cursor: not-allowed;
        border-color: var(--border);
      }
    `,
  ];

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
    if (this.disabled) return;
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  private _onDragEnter(e: DragEvent) {
    e.preventDefault();
    if (this.disabled) return;
    this._isDragging = true;
  }

  private _onDragLeave(e: DragEvent) {
    e.preventDefault();
    if (this.disabled) return;
    this._isDragging = false;
  }

  private _onDrop(e: DragEvent) {
    e.preventDefault();
    if (this.disabled) return;
    this._isDragging = false;

    const filesList = e.dataTransfer?.files;
    if (filesList) {
      const files = Array.from(filesList);
      this._processFiles(files);
    }
  }

  private _onClick() {
    if (this.disabled) return;
    const input = this.shadowRoot?.querySelector('.file-input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  private _onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this._processFiles(files);
      // Reset the input value so that the same file can be uploaded again if needed
      input.value = '';
    }
  }

  private _processFiles(files: File[]) {
    let filteredFiles = files;

    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map((type) => type.trim().toLowerCase());
      filteredFiles = files.filter((file) => {
        return acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            // Extension check (e.g. .png)
            return file.name.toLowerCase().endsWith(type);
          } else if (type.endsWith('/*')) {
            // Wildcard mime check (e.g. image/*)
            const baseType = type.slice(0, -2);
            return file.type.toLowerCase().startsWith(baseType);
          } else {
            // Exact mime type check (e.g. application/pdf)
            return file.type.toLowerCase() === type;
          }
        });
      });
    }

    if (filteredFiles.length === 0) return;

    this.dispatchEvent(
      new CustomEvent('forge-file-select', {
        bubbles: true,
        composed: true,
        detail: { files: filteredFiles },
      })
    );
  }

  render() {
    return html`
      <div
        class="upload-zone ${this._isDragging ? 'dragging' : ''} ${this.disabled ? 'disabled' : ''}"
        part="zone"
        @dragover="${this._onDragOver}"
        @dragenter="${this._onDragEnter}"
        @dragleave="${this._onDragLeave}"
        @drop="${this._onDrop}"
        @click="${this._onClick}"
      >
        <input
          type="file"
          class="file-input"
          part="input"
          .accept="${this.accept}"
          ?multiple="${this.multiple}"
          ?disabled="${this.disabled}"
          @change="${this._onFileChange}"
          style="display: none;"
        />
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-file-upload': ForgeFileUpload;
  }
}
