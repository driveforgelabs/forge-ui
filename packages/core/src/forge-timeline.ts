import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type TimelineEventType = 'info' | 'ok' | 'warn' | 'crit' | 'forge' | 'muted';

export interface ForgeTimelineEvent {
  id?: string;
  time: string;
  label: string;
  description?: string;
  type?: TimelineEventType;
}

/**
 * `forge-timeline` — Vertical event log with typed markers.
 *
 * Use for lap markers, fault timestamps, session events, and CAN bus logs.
 *
 * @attr events       Array of { time, label, description?, type?, id? }
 * @attr orientation  vertical | horizontal  (default: vertical)
 *
 * @fires forge-event-click  detail: { event, index }
 */
@customElement('forge-timeline')
export class ForgeTimeline extends LitElement {
  @property({ type: Array }) events: ForgeTimelineEvent[] = [];
  @property({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  static styles = [
    css`
      :host { display: block; }

      /* ── Vertical ──────────────────────────────────────────────── */
      .timeline {
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }

      :host([orientation='horizontal']) .timeline {
        flex-direction: row;
        align-items: flex-start;
        overflow-x: auto;
        padding-bottom: 4px;
        gap: 0;
      }

      .event {
        display: flex;
        gap: 12px;
        position: relative;
        cursor: pointer;
        padding: 0 0 20px 0;
      }

      :host([orientation='horizontal']) .event {
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 0 16px 0 0;
        flex-shrink: 0;
        min-width: 100px;
      }

      .event:last-child { padding-bottom: 0; }
      :host([orientation='horizontal']) .event:last-child { padding-right: 0; }

      /* ── Connector line ──────────────────────────────────────────── */
      .connector {
        position: absolute;
        background: var(--border);
      }

      /* vertical: line runs down from marker */
      .connector {
        left: 7px;
        top: 14px;
        bottom: -6px;
        width: 1px;
      }

      :host([orientation='horizontal']) .connector {
        top: 7px;
        left: 14px;
        right: -16px;
        bottom: auto;
        width: auto;
        height: 1px;
      }

      .event:last-child .connector { display: none; }

      /* ── Marker dot ──────────────────────────────────────────────── */
      .marker {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
        margin-top: 1px;
        transition: transform var(--duration-fast) ease;
      }

      :host([orientation='horizontal']) .marker { margin-top: 0; }

      .event:hover .marker { transform: scale(1.25); }

      .marker.info  { background: var(--data-blue-dim);  border-color: var(--data-blue); }
      .marker.ok    { background: var(--data-green-dim); border-color: var(--data-green); }
      .marker.warn  { background: var(--data-amber-dim); border-color: var(--data-amber); }
      .marker.crit  { background: var(--data-red-dim);   border-color: var(--data-red);
                      box-shadow: 0 0 6px rgba(229,62,62,0.4); }
      .marker.forge { background: var(--forge-subtle);   border-color: var(--forge); }
      .marker.muted { background: var(--muted-bg); border-color: var(--border-strong); }

      /* ── Content ─────────────────────────────────────────────────── */
      .content {
        flex: 1;
        min-width: 0;
      }

      :host([orientation='horizontal']) .content {
        text-align: center;
      }

      .time {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--fg-3);
        letter-spacing: 0.06em;
        margin-bottom: 2px;
        -webkit-font-smoothing: antialiased;
      }

      .label {
        font-family: var(--font-body);
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-1);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .description {
        font-family: var(--font-body);
        font-size: 12px;
        color: var(--fg-2);
        margin-top: 2px;
        line-height: 1.4;
        -webkit-font-smoothing: antialiased;
      }

      :host([orientation='horizontal']) .description { display: none; }
    `,
  ];

  render() {
    return html`
      <div class="timeline" part="timeline">
        ${this.events.map((ev, i) => this._renderEvent(ev, i))}
      </div>
    `;
  }

  private _renderEvent(ev: ForgeTimelineEvent, index: number) {
    const type = ev.type ?? 'muted';
    return html`
      <div
        class="event"
        @click="${() => this._click(ev, index)}"
        part="event"
        role="listitem"
      >
        <div class="connector" part="connector"></div>
        <div class="marker ${type}" part="marker"></div>
        <div class="content" part="content">
          <div class="time" part="time">${ev.time}</div>
          <div class="label" part="label">${ev.label}</div>
          ${ev.description
            ? html`<div class="description" part="description">${ev.description}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _click(ev: ForgeTimelineEvent, index: number) {
    this.dispatchEvent(
      new CustomEvent('forge-event-click', {
        bubbles: true,
        composed: true,
        detail: { event: ev, index },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-timeline': ForgeTimeline;
  }
}
