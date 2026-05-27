import { Component } from '@angular/core';

@Component({
  selector: 'ds-design-tokens-preview',
  standalone: true,
  template: `
    <div class="design-tokens-preview">
      <header class="tokens-hero">
        <p class="tokens-eyebrow ">Visual Language</p>
        <h1 class="tokens-title">Design Tokens</h1>
        <p class="tokens-desc">
          A small reusable layer extracted from the Perspectives Trail page. The goal is not to
          create a heavy framework, but to make the next page easier to build with consistent
          spacing, cards, thumbnails, score strips and price rows.
        </p>
      </header>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Trail detail</h2>
          <p>Use for compact facts such as duration, distance, season, guests or difficulty.</p>
        </div>

        <div class="ds-detail-grid tokens-demo-width">
          <article class="ds-detail-card">
            <div class="ds-detail-icon">
              <i class="fa-regular fa-clock" aria-hidden="true"></i>
            </div>
            <div>
              <div class="ds-detail-label">Duration</div>
              <div class="ds-detail-value">4–5 hours</div>
            </div>
          </article>

          <article class="ds-detail-card">
            <div class="ds-detail-icon">
              <i class="fa-solid fa-route" aria-hidden="true"></i>
            </div>
            <div>
              <div class="ds-detail-label">Distance</div>
              <div class="ds-detail-value">4.2 km</div>
            </div>
          </article>

          <article class="ds-detail-card">
            <div class="ds-detail-icon">
              <i class="fa-solid fa-chart-line" aria-hidden="true"></i>
            </div>
            <div>
              <div class="ds-detail-label">Elevation</div>
              <div class="ds-detail-value">+430 m</div>
            </div>
          </article>

          <article class="ds-detail-card">
            <div class="ds-detail-icon">
              <i class="fa-solid fa-users" aria-hidden="true"></i>
            </div>
            <div>
              <div class="ds-detail-label">Group size</div>
              <div class="ds-detail-value">Max 8 guests</div>
            </div>
          </article>
        </div>
      </section>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Preview thumbnails</h2>
          <p>Use for simple supporting image rows below a section title.</p>
        </div>

        <div class="ds-thumbnail-row">
          <figure class="ds-thumbnail">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
              alt="Trail map and gear"
            />
          </figure>
          <figure class="ds-thumbnail">
            <img
              src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600&q=80"
              alt="Camera on table"
            />
          </figure>
          <figure class="ds-thumbnail">
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
              alt="Tent in forest"
            />
          </figure>
        </div>
      </section>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Tags</h2>
          <p>Use for lightweight categories, filters, activity labels or content descriptors.</p>
        </div>

        <div class="ds-tag-list">
          <span class="ds-tag">
            <i class="fa-solid fa-mountain" aria-hidden="true"></i>
            <span>Alpine</span>
          </span>

          <span class="ds-tag">
            <i class="fa-solid fa-seedling" aria-hidden="true"></i>
            <span>Wildflowers</span>
          </span>

          <span class="ds-tag">
            <i class="fa-solid fa-camera-retro" aria-hidden="true"></i>
            <span>Photography</span>
          </span>

          <span class="ds-tag">
            <i class="fa-solid fa-crow" aria-hidden="true"></i>
            <span>Wildlife</span>
          </span>

          <span class="ds-tag">
            <i class="fa-solid fa-person-hiking" aria-hidden="true"></i>
            <span>Scrambling</span>
          </span>

          <span class="ds-tag">
            <i class="fa-solid fa-sun" aria-hidden="true"></i>
            <span>Sunset</span>
          </span>
        </div>
      </section>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Price breakdown</h2>
          <p>Use for booking cards, invoices or any right-aligned cost summary.</p>
        </div>

        <div class="ds-price-breakdown tokens-card--narrow">
          <div class="ds-price-row ds-price-row--link">
            <span>€89 × 2 guests</span>
            <span>€178</span>
          </div>
          <div class="ds-price-row ds-price-row--link">
            <span>Mountain guide fee</span>
            <span>€0</span>
          </div>
          <div class="ds-price-row ds-price-row--link">
            <span>Gondola pass</span>
            <span>€36</span>
          </div>
          <div class="ds-price-row ds-price-row--link">
            <span>Service fee</span>
            <span>€16</span>
          </div>
          <div class="ds-price-row ds-price-row--total">
            <span>Total</span>
            <span>€230</span>
          </div>
        </div>
      </section>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Gig score</h2>
          <p>Use for rating, difficulty score, quality score or any three-part trust summary.</p>
        </div>

        <div class="ds-score-strip">
          <div class="ds-score-item">
            <span class="ds-score-value">4.95</span>
            <span class="ds-score-stars">★★★★★</span>
            <span class="ds-score-label">Rating</span>
          </div>
          <div class="ds-score-item">
            <span class="ds-score-badge">
              <i class="fa-solid fa-medal" aria-hidden="true"></i>
              <span>Guest<br />favourite</span>
            </span>
          </div>
          <div class="ds-score-item">
            <span class="ds-score-value">84</span>
            <span class="ds-score-label">Reviews</span>
          </div>
        </div>
      </section>

      <section class="tokens-section">
        <div class="tokens-section__header">
          <h2>Info banner</h2>
          <p>Use for rare-find, limited availability, safety notice or helper content.</p>
        </div>

        <div class="tokens-card tokens-card--narrow">
          <div class="ds-info-banner">
            <div class="ds-info-banner__icon">
              <i class="fa-solid fa-fire-flame-curved text-lg" aria-hidden="true"></i>
            </div>
            <div>
              <div class="ds-info-banner__title">Rare find!</div>
              <div class="ds-info-banner__text">
                This experience is usually fully booked 3 weeks in advance.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .design-tokens-preview {
        max-width: 1120px;
        margin: 0 auto;
        color: var(--ds-color-text);
      }

      .tokens-hero {
        margin-bottom: 40px;
      }

      .tokens-eyebrow {
        margin-bottom: 8px;
        color: var(--color-text-link);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .tokens-title {
        margin: 0;
        font-family: var(--ds-font-display);
        font-size: 40px;
        line-height: 1.1;
        color: var(--ds-color-text);
      }

      .tokens-desc {
        max-width: 760px;
        margin-top: 12px;
        font-size: 15px;
        line-height: 1.7;
        color: var(--ds-color-muted);
      }

      .tokens-section {
        padding: 32px 0;
        border-top: 1px solid var(--ds-color-border);
      }

      .tokens-section__header {
        margin-bottom: 20px;
      }

      .tokens-section__header h2 {
        margin: 0;
        font-family: var(--ds-font-display);
        font-size: 26px;
        line-height: 1.2;
      }

      .tokens-section__header p {
        max-width: 680px;
        margin-top: 6px;
        font-size: 14px;
        line-height: 1.6;
        color: var(--ds-color-muted);
      }

      .tokens-demo-width {
        max-width: 720px;
      }

      .tokens-card--narrow {
        max-width: 520px;
      }

      @media (max-width: 640px) {
        .tokens-title {
          font-size: 32px;
        }
      }
    `,
  ],
})
export class DesignTokensPreviewComponent {}
