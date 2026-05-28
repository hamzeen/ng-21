import { Component } from '@angular/core';
import { ButtonComponent } from '@design-system/components/button';

@Component({
  selector: 'ds-forms-preview',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="forms-preview">
      <header class="forms-hero">
        <p class="forms-eyebrow">Primitives</p>
        <h1 class="forms-title">Forms</h1>
        <p class="forms-desc">
          Form primitives for inputs, selects, textareas, choices, switches and validation states.
          These classes provide structure and interaction states while still allowing pages to own
          layout and product-specific decisions.
        </p>
      </header>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Basic fields</h2>
          <p>Use for common text input, email, select and textarea patterns.</p>
        </div>

        <form class="ds-form forms-demo-card">
          <div class="ds-field">
            <label class="ds-label ds-label--required" for="guest-name">Name</label>
            <input id="guest-name" class="ds-input" type="text" placeholder="Enter your name" />
            <p class="ds-helper-text">Use your full name as it appears on your booking.</p>
          </div>

          <div class="ds-field-row">
            <div class="ds-field">
              <label class="ds-label" for="guest-email">Email</label>
              <input id="guest-email" class="ds-input" type="email" placeholder="you@example.com" />
            </div>

            <div class="ds-field">
              <label class="ds-label" for="guest-count">Guests</label>
              <select id="guest-count" class="ds-select">
                <option>1 guest</option>
                <option>2 guests</option>
                <option>3 guests</option>
                <option>4 guests</option>
              </select>
            </div>
          </div>

          <div class="ds-field">
            <label class="ds-label" for="notes">Notes</label>
            <textarea
              id="notes"
              class="ds-textarea"
              placeholder="Tell the host about your hiking experience"
            ></textarea>
          </div>
        </form>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Input group</h2>
          <p>Use for price, currency, search or inputs with leading or trailing content.</p>
        </div>

        <div class="forms-demo-card forms-demo-card--narrow">
          <div class="ds-field">
            <label class="ds-label" for="budget">Budget</label>
            <div class="ds-input-group">
              <span class="ds-input-group__addon">€</span>
              <input id="budget" class="ds-input" type="number" placeholder="230" />
              <span class="ds-input-group__addon">EUR</span>
            </div>
            <p class="ds-helper-text">Useful for booking cards, invoices and payment flows.</p>
          </div>
        </div>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Search composition</h2>
          <p>Use form primitives with an icon-only button for compact search experiences.</p>
        </div>

        <div class="forms-search-shell">
          <div class="forms-search-field">
            <label class="forms-search-label" for="search-where">Where</label>
            <input
              id="search-where"
              class="forms-search-input"
              type="text"
              placeholder="Search destinations"
            />
          </div>

          <div class="forms-search-divider" aria-hidden="true"></div>

          <div class="forms-search-field">
            <label class="forms-search-label" for="search-when">When</label>
            <input id="search-when" class="forms-search-input" type="text" placeholder="Add dates" />
          </div>

          <div class="forms-search-divider" aria-hidden="true"></div>

          <div class="forms-search-field">
            <label class="forms-search-label" for="search-who">Who</label>
            <input id="search-who" class="forms-search-input" type="text" placeholder="Add guests" />
          </div>

          <ds-button variant="primary" size="lg" [iconOnly]="true" ariaLabel="Search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </ds-button>
        </div>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Validation states</h2>
          <p>Use field-level state classes or aria-invalid for invalid inputs.</p>
        </div>

        <div class="forms-demo-card forms-demo-card--narrow">
          <div class="ds-field ds-field--invalid">
            <label class="ds-label ds-label--required" for="invalid-email">Email</label>
            <input
              id="invalid-email"
              class="ds-input"
              type="email"
              value="wrong-email"
              aria-invalid="true"
            />
            <p class="ds-error-text">Enter a valid email address.</p>
          </div>
        </div>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Choices</h2>
          <p>Use for checkboxes and radio options with optional helper text.</p>
        </div>

        <div class="forms-demo-card forms-demo-card--narrow">
          <label class="ds-choice">
            <input type="checkbox" checked />
            <span class="ds-choice__content">
              <span class="ds-choice__label">Include mountain guide fee</span>
              <span class="ds-choice__description">
                Recommended for first-time alpine walkers.
              </span>
            </span>
          </label>

          <label class="ds-choice">
            <input type="radio" name="pace" checked />
            <span class="ds-choice__content">
              <span class="ds-choice__label">Moderate pace</span>
              <span class="ds-choice__description">
                Balanced pace with short photography stops.
              </span>
            </span>
          </label>

          <label class="ds-choice">
            <input type="radio" name="pace" />
            <span class="ds-choice__content">
              <span class="ds-choice__label">Challenging pace</span>
              <span class="ds-choice__description">
                Faster route with fewer breaks along the trail.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Switch</h2>
          <p>Use for simple on/off preferences backed by a native checkbox.</p>
        </div>

        <div class="ds-form">
          <label class="ds-switch">
            <input class="ds-switch__input" type="checkbox" />

            <span class="ds-switch__content">
              <span class="ds-switch__label">Not checked</span>
              <span class="ds-switch__description">
                Default off state for optional preferences.
              </span>
            </span>
          </label>

          <label class="ds-switch">
            <input class="ds-switch__input" type="checkbox" checked />

            <span class="ds-switch__content">
              <span class="ds-switch__label">Checked by default</span>
              <span class="ds-switch__description">
                Use when a helpful preference is enabled by default.
              </span>
            </span>
          </label>

          <label class="ds-switch">
            <input class="ds-switch__input" type="checkbox" disabled />

            <span class="ds-switch__content">
              <span class="ds-switch__label">Disabled</span>
              <span class="ds-switch__description">
                Use when the preference is unavailable or locked.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section class="forms-section">
        <div class="forms-section__header">
          <h2>Compact fields</h2>
          <p>Use compact variants when density matters, such as filters or side panels.</p>
        </div>

        <div class="forms-demo-card forms-demo-card--narrow">
          <div class="ds-field-row">
            <div class="ds-field">
              <label class="ds-label" for="compact-from">From</label>
              <input id="compact-from" class="ds-input ds-input--sm" type="date" />
            </div>

            <div class="ds-field">
              <label class="ds-label" for="compact-to">To</label>
              <input id="compact-to" class="ds-input ds-input--sm" type="date" />
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .forms-preview {
        max-width: 1120px;
        margin: 0 auto;
      }

      .forms-hero {
        margin-bottom: 40px;
      }

      .forms-eyebrow {
        margin-bottom: 8px;
        color: var(--color-text-link);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .forms-title {
        margin: 0;
        font-size: 40px;
        line-height: 1.1;
      }

      .forms-desc {
        max-width: 760px;
        margin-top: 12px;
        font-size: 15px;
        line-height: 1.7;
        color: var(--color-gray-600);
      }

      .forms-section {
        padding: 32px 0;
        border-top: 1px solid var(--color-gray-300);
      }

      .forms-section__header {
        margin-bottom: 20px;
      }

      .forms-section__header h2 {
        margin: 0;
        font-size: 26px;
        line-height: 1.2;
      }

      .forms-section__header p {
        max-width: 680px;
        margin-top: 6px;
        font-size: 14px;
        line-height: 1.6;
        color: var(--color-gray-600);
      }

      .forms-demo-card {
        max-width: 760px;
      }

      .forms-demo-card--narrow {
        max-width: 520px;
      }

      .forms-search-shell {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 0;
        width: min(100%, 980px);
        min-height: 72px;
        border: 1px solid var(--color-gray-300);
        border-radius: 9999px;
        background: var(--color-white);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        padding: 8px 10px 8px 28px;
      }

      .forms-search-field {
        min-width: 0;
      }

      .forms-search-label {
        display: block;
        margin-bottom: 4px;
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
        color: var(--color-gray-900);
      }

      .forms-search-input {
        width: 100%;
        min-width: 0;
        border: 0;
        background: transparent;
        color: var(--color-gray-900);
        font-size: 16px;
        line-height: 1.3;
        outline: none;
      }

      .forms-search-input::placeholder {
        color: var(--color-gray-500);
      }

      .forms-search-divider {
        width: 1px;
        height: 36px;
        margin-inline: 28px;
        background: var(--color-gray-300);
      }

      @media (max-width: 640px) {
        .forms-title {
          font-size: 32px;
        }

        .forms-search-shell {
          grid-template-columns: 1fr auto;
          row-gap: 16px;
          border-radius: 32px;
          padding: 20px;
        }

        .forms-search-divider {
          display: none;
        }

        .forms-search-field {
          grid-column: 1 / -1;
        }
      }
    `,
  ],
})
export class FormsPreviewComponent {}
