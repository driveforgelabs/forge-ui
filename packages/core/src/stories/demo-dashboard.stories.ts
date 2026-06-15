import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../forge-avatar.js';
import '../forge-button.js';
import '../forge-card.js';
import '../forge-stat-card.js';
import '../forge-empty-state.js';

const meta: Meta<Record<string, unknown>> = {
  title: 'Demo/Dashboard',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['dark', 'light'],
      description: 'Active visual color theme',
      table: { defaultValue: { summary: 'dark' } },
    },
  },
  args: {
    theme: 'dark',
  },
  render: ({ theme }) => html`
    <style>
      /* Layout Container */
      .app-container {
        display: flex;
        width: 100%;
        min-height: 100vh;
        background-color: var(--bg-base);
        color: var(--fg-1);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        margin: -1rem; /* Reset Storybook padding */
        box-sizing: border-box;
        transition: background-color var(--duration-base) ease, color var(--duration-base) ease;
      }

      /* Sidebar styles */
      .sidebar {
        width: 260px;
        background-color: var(--bg-inset);
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--space-4) var(--space-4) var(--space-5) var(--space-4);
        flex-shrink: 0;
        box-sizing: border-box;
        transition: background-color var(--duration-base) ease, border-color var(--duration-base) ease;
      }

      .sidebar-top {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-1) var(--space-2);
      }

      .logo-icon {
        width: 32px;
        height: 32px;
        background-color: var(--forge);
        color: white;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-title {
        font-family: var(--font-body);
        font-weight: var(--weight-bold);
        font-size: 14px;
        color: var(--fg-1);
        line-height: 1.2;
      }

      .logo-subtitle {
        font-family: var(--font-display);
        font-size: 10px;
        color: var(--fg-2);
        letter-spacing: var(--tracking-wider);
        text-transform: uppercase;
        line-height: 1;
        margin-top: 2px;
      }

      .profile-selector {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: transparent;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 10px 12px;
        cursor: pointer;
        transition: background-color var(--duration-fast);
      }

      .profile-selector:hover {
        background-color: var(--bg-elevated);
      }

      .profile-info {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .profile-avatar-mini {
        width: 18px;
        height: 18px;
        border-radius: var(--radius-xs);
        background-color: var(--forge-dim);
        border: 1px solid var(--forge);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-family: var(--font-body);
        font-weight: bold;
        color: var(--fg-1);
      }

      .profile-name {
        font-weight: var(--weight-medium);
        color: var(--fg-1);
        font-size: 13px;
      }

      .quick-create-btn {
        width: 100%;
        margin-top: 4px;
      }

      /* Sidebar Nav Links */
      .nav-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: var(--space-4);
      }

      .nav-label {
        font-family: var(--font-display);
        font-size: 11px;
        color: var(--fg-3);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wider);
        padding: 4px var(--space-2);
        font-weight: var(--weight-bold);
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: 10px 12px;
        border-radius: var(--radius-md);
        color: var(--fg-2);
        text-decoration: none;
        font-weight: var(--weight-medium);
        transition: all var(--duration-fast);
        font-size: 13px;
      }

      .nav-item:hover {
        color: var(--fg-1);
        background-color: var(--border-subtle);
      }

      .nav-item.active {
        color: var(--fg-1);
        background-color: var(--bg-elevated);
      }

      .nav-item svg {
        opacity: 0.6;
        transition: opacity var(--duration-fast);
      }

      .nav-item.active svg,
      .nav-item:hover svg {
        opacity: 1;
      }

      /* Bottom section helper card */
      .sidebar-bottom {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }

      .helper-card {
        background-color: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 14px;
      }

      .helper-title {
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
        font-size: 12px;
        margin-bottom: 4px;
      }

      .helper-text {
        color: var(--fg-2);
        font-size: 11px;
        line-height: 1.4;
      }

      .user-profile-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--space-3);
        border-top: 1px solid var(--border-subtle);
      }

      .user-details {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        overflow: hidden;
      }

      .user-meta {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .user-name {
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
        font-size: 12px;
        line-height: 1.2;
      }

      .user-email {
        color: var(--fg-3);
        font-size: 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 1px;
      }

      .more-actions-btn {
        background: none;
        border: none;
        color: var(--fg-3);
        cursor: pointer;
        padding: 4px;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .more-actions-btn:hover {
        color: var(--fg-1);
        background-color: var(--border-subtle);
      }

      /* Main Dashboard Area */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow-y: auto;
      }

      /* Header top bar */
      .header-bar {
        height: 52px;
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--space-5);
        background-color: var(--bg-inset);
        flex-shrink: 0;
        box-sizing: border-box;
        transition: background-color var(--duration-base) ease, border-color var(--duration-base) ease;
      }

      .header-title-block {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .header-icon {
        color: var(--fg-3);
        display: flex;
        align-items: center;
      }

      .header-info {
        display: flex;
        flex-direction: column;
      }

      .header-breadcrumbs {
        font-family: var(--font-display);
        font-size: 10px;
        color: var(--fg-3);
        letter-spacing: var(--tracking-wider);
        text-transform: uppercase;
        font-weight: var(--weight-bold);
      }

      .header-desc {
        color: var(--fg-2);
        font-size: 11px;
        margin-top: 2px;
      }

      .header-right {
        color: var(--fg-3);
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: color var(--duration-fast);
      }

      .header-right:hover {
        color: var(--fg-1);
      }

      /* Scrollable container */
      .dashboard-grid {
        padding: var(--space-5);
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        box-sizing: border-box;
      }

      /* Grid Row Layouts */
      .grid-row-top {
        display: grid;
        grid-template-columns: 1.7fr 1fr;
        gap: var(--space-5);
      }

      .grid-row-bottom {
        display: grid;
        grid-template-columns: 1.7fr 1fr;
        gap: var(--space-5);
      }

      /* Large Card with Grid Overlay */
      .hero-grid-card {
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        background-color: var(--bg-cluster);
        background-image:
          linear-gradient(var(--border-subtle) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
        background-size: 20px 20px;
        padding: var(--space-5);
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 380px;
        box-sizing: border-box;
        transition: background-color var(--duration-base) ease, border-color var(--duration-base) ease;
      }

      .hero-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--space-5);
      }

      .hero-subtitle-top {
        font-family: var(--font-display);
        font-size: 11px;
        color: var(--fg-3);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wider);
        font-weight: var(--weight-bold);
      }

      .hero-title {
        font-family: var(--font-body);
        font-weight: var(--weight-regular);
        font-size: 38px;
        color: var(--fg-1);
        margin: 0;
      }

      .hero-description {
        color: var(--fg-2);
        font-size: 13px;
        line-height: 1.5;
        max-width: 580px;
        margin-top: 6px;
      }

      /* Stat Mini Cards Grid */
      .stat-mini-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-3);
        width: 100%;
        margin-top: auto;
      }

      .stat-mini-card {
        background-color: var(--bg-overlay);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 14px 16px;
        backdrop-filter: blur(4px);
        display: flex;
        flex-direction: column;
        gap: 6px;
        transition: border-color var(--duration-fast);
      }

      .stat-mini-card:hover {
        border-color: var(--border-strong);
      }

      .stat-mini-icon {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-xs);
        background-color: var(--forge-subtle);
        border: 1px solid var(--forge-glow);
        color: var(--forge);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
      }

      .stat-mini-label {
        font-family: var(--font-display);
        font-size: 10px;
        color: var(--fg-2);
        letter-spacing: var(--tracking-wider);
        text-transform: uppercase;
        font-weight: var(--weight-bold);
        line-height: 1.2;
      }

      .stat-mini-value {
        font-family: var(--font-mono);
        font-size: 22px;
        font-weight: var(--weight-light);
        color: var(--fg-1);
        line-height: 1;
      }

      /* Quick Start Actions Card */
      .actions-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
      }

      .actions-subtitle {
        font-family: var(--font-display);
        font-size: 11px;
        color: var(--fg-3);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wider);
        font-weight: var(--weight-bold);
        margin-bottom: 2px;
      }

      .actions-title {
        font-family: var(--font-body);
        font-size: 24px;
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
        margin: 0 0 var(--space-5) 0;
      }

      .action-steps-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .action-step-item {
        background-color: transparent;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 14px;
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        transition: border-color var(--duration-fast), background-color var(--duration-fast);
      }

      .action-step-item:hover {
        background-color: var(--bg-elevated);
        border-color: var(--border);
      }

      .action-step-badge {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-xs);
        background-color: var(--forge-subtle);
        border: 1px solid var(--forge);
        color: var(--forge-light);
        font-family: var(--font-mono);
        font-weight: var(--weight-bold);
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .action-step-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .action-step-title {
        font-size: 12px;
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
      }

      .action-step-desc {
        font-size: 11px;
        color: var(--fg-2);
        line-height: 1.4;
      }

      /* Bottom Row Panels */
      .panel-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
      }

      .panel-subtitle {
        font-family: var(--font-display);
        font-size: 11px;
        color: var(--fg-3);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wider);
        font-weight: var(--weight-bold);
        margin-bottom: 2px;
      }

      .panel-title {
        font-family: var(--font-body);
        font-size: 20px;
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
        margin: 0 0 var(--space-5) 0;
      }

      /* Recent Activity Panel */
      .recent-activity-panel {
        min-height: 320px;
        display: flex;
        flex-direction: column;
      }

      .activity-empty-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        color: var(--fg-3);
      }

      .activity-empty-icon {
        width: 36px;
        height: 36px;
        color: var(--fg-3);
        opacity: 0.5;
      }

      .activity-empty-text {
        font-size: 13px;
        color: var(--fg-2);
      }

      /* Snapshot Table Panel */
      .snapshot-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .snapshot-rows {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .snapshot-row {
        background-color: transparent;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-body);
        font-size: 13px;
        transition: background var(--duration-fast);
      }

      .snapshot-row:hover {
        background-color: var(--bg-elevated);
      }

      .snapshot-key {
        color: var(--fg-2);
      }

      .snapshot-value {
        font-weight: var(--weight-semibold);
        color: var(--fg-1);
      }
    </style>

    <div class="app-container ${theme === 'light' ? 'theme-light' : ''}">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-top">
          <!-- Logo -->
          <div class="logo-section">
            <div class="logo-icon">
              <!-- Wrench icon inside an orange square badge -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-title">Mecano</span>
              <span class="logo-subtitle">Workshop OS</span>
            </div>
          </div>

          <!-- Profile Selector -->
          <div class="profile-selector">
            <div class="profile-info">
              <div class="profile-avatar-mini">O</div>
              <span class="profile-name">Oficina</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;">
              <path d="m7 15 5 5 5-5"></path>
              <path d="m7 9 5-5 5 5"></path>
            </svg>
          </div>

          <!-- Quick Create Action Button -->
          <forge-button variant="primary" class="quick-create-btn">
            + Quick Create
          </forge-button>

          <!-- Navigation Groups -->
          <div class="nav-group">
            <div class="nav-label">Management</div>
            <a href="#" class="nav-item active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="#" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <path d="M9 17h6"></path>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
              <span>Vehicles</span>
            </a>
            <a href="#" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Job Cards</span>
            </a>
          </div>
        </div>

        <div class="sidebar-bottom">
          <!-- Callout Helper Card -->
          <div class="helper-card">
            <div class="helper-title">Looking for something more?</div>
            <div class="helper-text">Open an issue or do reach out to me.</div>
          </div>

          <!-- User Profile Footer -->
          <div class="user-profile-footer">
            <div class="user-details">
              <forge-avatar name="Oficina" size="sm"></forge-avatar>
              <div class="user-meta">
                <span class="user-name">Oficina</span>
                <span class="user-email">devve-work@proto...</span>
              </div>
            </div>
            <button class="more-actions-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <!-- Header Bar -->
        <header class="header-bar">
          <div class="header-title-block">
            <span class="header-icon">
              <!-- Sidebar Layout Icon -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </span>
            <div class="header-info">
              <span class="header-breadcrumbs">Operations Deck</span>
              <span class="header-desc">Workshop context, navigation, and language controls stay in one frame.</span>
            </div>
          </div>
          <div class="header-right">
            <!-- Globe icon -->
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
        </header>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
          <!-- Top Row -->
          <div class="grid-row-top">
            <!-- My Garage Hero Section -->
            <div class="hero-grid-card">
              <div class="hero-header">
                <span class="hero-subtitle-top">Personal Maintenance Overview</span>
                <h1 class="hero-title">My Garage</h1>
                <p class="hero-description">Monitor maintenance history, vehicle usage, and logged costs from one personal garage view.</p>
              </div>

              <!-- Stat Mini Cards Grid -->
              <div class="stat-mini-grid">
                <!-- Stat Card 1 -->
                <div class="stat-mini-card">
                  <div class="stat-mini-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                  </div>
                  <span class="stat-mini-label">Vehicles Used</span>
                  <span class="stat-mini-value">0/2</span>
                </div>

                <!-- Stat Card 2 -->
                <div class="stat-mini-card">
                  <div class="stat-mini-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                  </div>
                  <span class="stat-mini-label">Tracked Vehicles</span>
                  <span class="stat-mini-value">0</span>
                </div>

                <!-- Stat Card 3 -->
                <div class="stat-mini-card">
                  <div class="stat-mini-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  </div>
                  <span class="stat-mini-label">Maintenance Records</span>
                  <span class="stat-mini-value">0</span>
                </div>

                <!-- Stat Card 4 -->
                <div class="stat-mini-card">
                  <div class="stat-mini-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </div>
                  <span class="stat-mini-label">Monthly Cost Logged</span>
                  <span class="stat-mini-value" style="font-size: 18px;">EUR 0.00</span>
                </div>
              </div>
            </div>

            <!-- Quick Start Guide Card -->
            <forge-card variant="filled" padding="var(--space-5)">
              <div class="actions-card">
                <span class="actions-subtitle">Quick Start Guide</span>
                <h2 class="actions-title">Next actions</h2>

                <div class="action-steps-list">
                  <!-- Step 1 -->
                  <div class="action-step-item">
                    <div class="action-step-badge">01</div>
                    <div class="action-step-content">
                      <span class="action-step-title">Add a Vehicle</span>
                      <span class="action-step-desc">Start by registering one of your vehicles.</span>
                    </div>
                  </div>

                  <!-- Step 2 -->
                  <div class="action-step-item">
                    <div class="action-step-badge">02</div>
                    <div class="action-step-content">
                      <span class="action-step-title">Log Maintenance</span>
                      <span class="action-step-desc">Create a maintenance record with labor, parts, and total cost.</span>
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="action-step-item">
                    <div class="action-step-badge">03</div>
                    <div class="action-step-content">
                      <span class="action-step-title">Upgrade When Ready</span>
                      <span class="action-step-desc">Unlock clients, inventory, uploads, and more by upgrading later.</span>
                    </div>
                  </div>
                </div>
              </div>
            </forge-card>
          </div>

          <!-- Bottom Row -->
          <div class="grid-row-bottom">
            <!-- Recent Activity Panel -->
            <forge-card variant="filled" padding="var(--space-5)">
              <div class="panel-card recent-activity-panel">
                <div>
                  <span class="panel-subtitle">Recent Activity</span>
                  <h2 class="panel-title">Active workstream</h2>
                </div>
                <div class="activity-empty-container">
                  <!-- Grid icon -->
                  <svg class="activity-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span class="activity-empty-text">No recent activities to display.</span>
                </div>
              </div>
            </forge-card>

            <!-- Snapshot Panel -->
            <forge-card variant="filled" padding="var(--space-5)">
              <div class="panel-card snapshot-panel">
                <div>
                  <span class="panel-subtitle">Snapshot</span>
                  <h2 class="panel-title">Current posture</h2>
                </div>

                <div class="snapshot-rows">
                  <div class="snapshot-row">
                    <span class="snapshot-key">Plan mode</span>
                    <span class="snapshot-value">Personal Garage</span>
                  </div>
                  <div class="snapshot-row">
                    <span class="snapshot-key">Vehicle capacity</span>
                    <span class="snapshot-value">0/2</span>
                  </div>
                  <div class="snapshot-row">
                    <span class="snapshot-key">Maintenance entries</span>
                    <span class="snapshot-value">0</span>
                  </div>
                </div>
              </div>
            </forge-card>
          </div>
        </div>
      </main>
    </div>
  `,
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

export const MyGarage: Story = {};

