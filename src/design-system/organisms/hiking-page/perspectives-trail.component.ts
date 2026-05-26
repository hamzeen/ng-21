import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perspectives-trail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- ── Gallery ─────────────────────────────────── -->
      <div class="gallery">
        <div class="gallery__main gallery__cell">
          <img
            class="gallery__img"
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"
            alt="Mountain trail panorama"
          />
        </div>
        <div class="gallery__cell">
          <img
            class="gallery__img"
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80"
            alt="Hiker on alpine path"
          />
        </div>
        <div class="gallery__cell">
          <img
            class="gallery__img"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
            alt="Mountain summit view"
          />
          <button class="gallery__btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Show all photos
          </button>
        </div>
      </div>

      <!-- ── Content grid ─────────────────────────────── -->
      <div class="content-grid">
        <!-- ── LEFT COLUMN ─────────────────────────────── -->
        <div class="left-col">
          <!-- Header -->
          <div class="listing-header">
            <h1 class="listing-title">Perspectives Trail — Alpine Summit Experience</h1>
            <div class="listing-meta">
              <span>2,334m elevation</span>
              <span class="dot">·</span>
              <span>Nordkette, Innsbruck</span>
              <span class="dot">·</span>
              <span>Tyrol, Austria</span>
            </div>

            <!-- Stats bar -->
            <div class="listing-stats">
              <div class="stat-block">
                <span class="stat-block__value">4.95</span>
                <div class="stat-block__stars">★★★★★</div>
                <span class="stat-block__label">Rating</span>
              </div>
              <div class="stat-block">
                <div class="stat-block__badge">
                  <span>🏅</span>
                  <span>Guest<br />favourite</span>
                </div>
              </div>
              <div class="stat-block">
                <span class="stat-block__value">84</span>
                <span class="stat-block__label">Reviews</span>
              </div>
            </div>
          </div>

          <!-- Host -->
          <div class="host-row">
            <img
              class="host-avatar"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80"
              alt="Guide Markus"
            />
            <div class="host-info">
              <div class="host-info__name">Guided by Markus Alpenführer</div>
              <div class="host-info__meta">Certified mountain guide · 6 years experience</div>
            </div>
            <div class="superhost-badge">🏆 Superguide</div>
          </div>

          <!-- Highlights -->
          <div class="section">
            <div class="highlights">
              <div class="highlight-item">
                <div class="highlight-item__icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="highlight-item__content">
                  <div class="highlight-item__content__title">Breathtaking 360° panorama</div>
                  <div class="highlight-item__content__desc">
                    Stand above the clouds with views of over 90 Alpine peaks, stretching from the
                    Zugspitze to the Dolomites on clear days.
                  </div>
                </div>
              </div>

              <div class="highlight-item">
                <div class="highlight-item__icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div class="highlight-item__content">
                  <div class="highlight-item__content__title">Expert local guidance included</div>
                  <div class="highlight-item__content__desc">
                    Your certified Alpenführer knows every boulder and wildflower. Safety briefing,
                    gear check and cultural storytelling along the way.
                  </div>
                </div>
              </div>

              <div class="highlight-item">
                <div class="highlight-item__icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.95 5.05l.707-.707"
                    />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <div class="highlight-item__content">
                  <div class="highlight-item__content__title">Golden hour summit experience</div>
                  <div class="highlight-item__content__desc">
                    Timed to reach the Hafelekar peak at dusk — the Alpenglow turns the limestone
                    cliffs a deep amber and rose.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="section">
            <h2 class="section__title">About this experience</h2>
            <div class="description">
              <p>
                The Perspectives Trail winds from the Seegrube station at 1,905m up to the Hafelekar
                summit at 2,334m — one of Innsbruck's most iconic Alpine walks. The path crosses
                exposed limestone ridges, wildflower meadows and ancient glacial moraines, offering
                a window into 300 million years of geological history.
              </p>
              <p>
                This is a moderate trail with some scrambling sections near the summit. Total
                distance is 4.2km one way with 430m of ascent. The experience includes gondola
                access, guided narration and a warming drink at the summit shelter.
              </p>
            </div>
            <button class="show-more">Show more →</button>

            <!-- Tags -->
            <div class="tag-list">
              <span class="tag">⛰ Alpine</span>
              <span class="tag">🌿 Wildflowers</span>
              <span class="tag">📸 Photography</span>
              <span class="tag">🦅 Wildlife</span>
              <span class="tag">🧗 Scrambling</span>
              <span class="tag">🌅 Sunset</span>
            </div>
          </div>

          <!-- Trail Details -->
          <div class="section">
            <h2 class="section__title">Trail details</h2>
            <div class="details-grid">
              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 2.05V13h10.95C23.38 7.2 18.8 2.62 13 2.05z" />
                    <path
                      d="M12 2.05C6.06 2.55 1.5 7.52 1.5 13.5c0 6.07 4.93 11 11 11 5.98 0 10.95-4.56 11.45-10.5H12V2.05z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Difficulty</div>
                  <div class="detail-card__value">Moderate</div>
                </div>
              </div>

              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Duration</div>
                  <div class="detail-card__value">4–5 hours</div>
                </div>
              </div>

              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3h18M3 12h18M3 21h18" />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Distance</div>
                  <div class="detail-card__value">4.2 km</div>
                </div>
              </div>

              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Elevation gain</div>
                  <div class="detail-card__value">+430 m</div>
                </div>
              </div>

              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Group size</div>
                  <div class="detail-card__value">Max 8 guests</div>
                </div>
              </div>

              <div class="detail-card">
                <div class="detail-card__icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div>
                  <div class="detail-card__label">Season</div>
                  <div class="detail-card__value">Jun — Oct</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Photo gallery row -->
          <div class="section">
            <h2 class="section__title">Along the trail</h2>
            <div class="photo-row">
              <div class="photo-row__item">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80"
                  alt="Alpine wildflowers"
                />
              </div>
              <div class="photo-row__item">
                <img
                  src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&q=80"
                  alt="Mountain camping"
                />
              </div>
              <div class="photo-row__item">
                <img
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80"
                  alt="Glamping in mountains"
                />
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="section">
            <h2 class="section__title">Guest reviews</h2>
            <div class="reviews-summary">
              <div class="reviews-summary__score">4.95</div>
              <div class="reviews-summary__right">
                <div class="reviews-summary__stars">★★★★★</div>
                <div class="reviews-summary__count">84 reviews</div>
              </div>
            </div>

            <div class="reviews-grid">
              <div class="review-card">
                <div class="review-card__header">
                  <img
                    class="review-card__avatar"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80"
                    alt="Sarah"
                  />
                  <div>
                    <div class="review-card__name">Sarah M.</div>
                    <div class="review-card__date">August 2025</div>
                  </div>
                </div>
                <div class="review-card__stars">★★★★★</div>
                <div class="review-card__text">
                  Markus is an extraordinary guide — his knowledge of the geology and local legends
                  made the whole trail come alive. The golden hour at the summit was absolutely
                  magical.
                </div>
              </div>

              <div class="review-card">
                <div class="review-card__header">
                  <img
                    class="review-card__avatar"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
                    alt="Thomas"
                  />
                  <div>
                    <div class="review-card__name">Thomas K.</div>
                    <div class="review-card__date">July 2025</div>
                  </div>
                </div>
                <div class="review-card__stars">★★★★★</div>
                <div class="review-card__text">
                  Did this with my family including two teenagers. The scrambling section was
                  exhilarating and the kids loved the wildlife spotting. Chamois sightings! Views
                  are absolutely unreal.
                </div>
              </div>

              <div class="review-card">
                <div class="review-card__header">
                  <img
                    class="review-card__avatar"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80"
                    alt="Emma"
                  />
                  <div>
                    <div class="review-card__name">Emma V.</div>
                    <div class="review-card__date">September 2025</div>
                  </div>
                </div>
                <div class="review-card__stars">★★★★★</div>
                <div class="review-card__text">
                  As a photographer this trail is a dream. Every turn reveals a new composition.
                  Markus knows exactly where to stop for the best light. I came back three weeks
                  later.
                </div>
              </div>

              <div class="review-card">
                <div class="review-card__header">
                  <img
                    class="review-card__avatar"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80"
                    alt="James"
                  />
                  <div>
                    <div class="review-card__name">James R.</div>
                    <div class="review-card__date">June 2025</div>
                  </div>
                </div>
                <div class="review-card__stars">★★★★★</div>
                <div class="review-card__text">
                  Perfect blend of challenge and reward. The warming drink at the summit shelter
                  after the final scramble was a lovely touch. Already planning my return for the
                  winter edition.
                </div>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="section">
            <h2 class="section__title">Location</h2>
            <p class="description">
              Seegrube Station, Nordkette — accessible via the Hungerburgbahn from Innsbruck city
              centre. Free parking at Congress Innsbruck.
            </p>
            <div class="map-placeholder">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=60"
                alt="Mountain location"
              />
              <div class="map-placeholder__label">📍 Nordkette, Innsbruck, Austria</div>
            </div>
          </div>
        </div>

        <!-- ── RIGHT COLUMN — Booking card ─────────────── -->
        <div class="right-col">
          <div class="booking-card">
            <div class="booking-card__price">€89 <span>/ person</span></div>
            <div class="booking-card__rating">
              <span class="brand-star">★</span>
              <strong>4.95</strong>
              · 84 reviews
            </div>

            <!-- Rare find -->
            <div class="rare-find">
              <div class="rare-find__icon">💎</div>
              <div>
                <div class="rare-find__title">Rare find!</div>
                <div class="rare-find__desc">
                  This experience is usually fully booked 3 weeks in advance.
                </div>
              </div>
            </div>

            <!-- Date + guests -->
            <div class="date-picker">
              <div class="date-picker__row">
                <div class="date-picker__field">
                  <div class="date-picker__label">Check-in</div>
                  <div class="date-picker__value">19 Jun 2026</div>
                </div>
                <div class="date-picker__field">
                  <div class="date-picker__label">Check-out</div>
                  <div class="date-picker__value">19 Jun 2026</div>
                </div>
              </div>
              <div class="guests-field">
                <div>
                  <div class="guests-field__label">Guests</div>
                  <div class="guests-field__value">2 guests</div>
                </div>
                <span class="guests-field__chevron">∨</span>
              </div>
            </div>

            <button class="reserve-btn">Reserve now</button>
            <p class="booking-card__no-charge">You won't be charged yet</p>

            <!-- Price breakdown -->
            <div class="price-breakdown">
              <div class="price-breakdown__row price-breakdown__row--underline">
                <span>€89 × 2 guests</span>
                <span>€178</span>
              </div>
              <div class="price-breakdown__row price-breakdown__row--underline">
                <span>Mountain guide fee</span>
                <span>€0</span>
              </div>
              <div class="price-breakdown__row price-breakdown__row--underline">
                <span>Gondola pass</span>
                <span>€36</span>
              </div>
              <div class="price-breakdown__row price-breakdown__row--underline">
                <span>Service fee</span>
                <span>€16</span>
              </div>
              <div class="price-breakdown__row price-breakdown__row--total">
                <span>Total</span>
                <span>€230</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --brand: #ff385c;
        --brand-dark: #e0294b;
        --text-primary: #222222;
        --text-secondary: #717171;
        --border: #dddddd;
        --bg-subtle: #f7f7f7;
        --white: #ffffff;
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-pill: 9999px;
        --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.08);
        --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
        --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.16);
      }

      :host {
        display: block;
        font-family: 'DM Sans', sans-serif;
        color: var(--text-primary);
        background: var(--white);
        -webkit-font-smoothing: antialiased;
      }

      /* ── Photo Gallery ─────────────────────────────── */
      .gallery {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 340px 340px;
        gap: 8px;
        max-height: 680px;
        overflow: hidden;
        border-radius: var(--radius-lg);
        position: relative;
      }

      .gallery__main {
        grid-row: 1 / 3;
        grid-column: 1;
      }

      .gallery__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
        cursor: pointer;
      }
      .gallery__img:hover {
        transform: scale(1.02);
      }

      .gallery__cell {
        overflow: hidden;
        position: relative;
      }

      .gallery__btn {
        position: absolute;
        bottom: 16px;
        right: 16px;
        background: var(--white);
        border: 1px solid var(--text-primary);
        border-radius: var(--radius-sm);
        padding: 8px 14px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: background 0.15s;
        z-index: 2;
      }
      .gallery__btn:hover {
        background: var(--bg-subtle);
      }

      /* ── Layout ────────────────────────────────────── */
      .page {
        max-width: 1120px;
        margin: 0 auto;
        padding: 0 24px 80px;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 80px;
        align-items: start;
        margin-top: 48px;
      }

      /* ── Header ────────────────────────────────────── */
      .listing-header {
        padding: 24px 0 20px;
        border-bottom: 1px solid var(--border);
      }

      .listing-title {
        font-family: 'Lora', serif;
        font-size: 28px;
        font-weight: 600;
        line-height: 1.25;
        margin-bottom: 8px;
        color: var(--text-primary);
      }

      .listing-meta {
        font-size: 15px;
        color: var(--text-secondary);
        display: flex;
        flex-wrap: wrap;
        gap: 4px 0;
      }

      .listing-meta span {
        display: inline;
      }
      .listing-meta .dot {
        margin: 0 6px;
      }

      .listing-stats {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 14px;
        padding-top: 14px;
        border-top: 1px solid var(--border);
      }

      .stat-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 0 16px;
        border-right: 1px solid var(--border);
      }
      .stat-block:last-child {
        border-right: none;
      }

      .stat-block__value {
        font-size: 22px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .stat-block__stars {
        color: var(--brand);
        font-size: 13px;
        margin-top: 2px;
      }

      .stat-block__label {
        font-size: 13px;
        color: var(--text-secondary);
        margin-top: 2px;
        text-align: center;
      }

      .stat-block__badge {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 600;
      }

      /* ── Host row ──────────────────────────────────── */
      .host-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 24px 0;
        border-bottom: 1px solid var(--border);
      }

      .host-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--white);
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
      }

      .host-info__name {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .host-info__meta {
        font-size: 14px;
        color: var(--text-secondary);
        margin-top: 2px;
      }

      .superhost-badge {
        margin-left: auto;
        background: var(--bg-subtle);
        border-radius: var(--radius-pill);
        padding: 6px 14px;
        font-size: 12px;
        font-weight: 600;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }

      /* ── Description ───────────────────────────────── */
      .section {
        padding: 32px 0;
        border-bottom: 1px solid var(--border);
      }
      .section:last-child {
        border-bottom: none;
      }

      .section__title {
        font-family: 'Lora', serif;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .description {
        font-size: 16px;
        line-height: 1.7;
        color: var(--text-secondary);
      }

      .description p + p {
        margin-top: 16px;
      }

      .show-more {
        background: none;
        border: none;
        cursor: pointer;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary);
        text-decoration: underline;
        margin-top: 16px;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* ── Highlights ─────────────────────────────────── */
      .highlights {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 20px;
      }

      .highlight-item__icon {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
      }

      .highlight-item__icon svg {
        width: 28px;
        height: 28px;
        stroke: currentColor;
        fill: none;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .highlight-item__content__title {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
      }

      .highlight-item__content__desc {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.5;
      }

      /* ── Trail Details Grid ─────────────────────────── */
      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .detail-card {
        background: var(--bg-subtle);
        border-radius: var(--radius-md);
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .detail-card__icon {
        width: 44px;
        height: 44px;
        background: var(--white);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: var(--shadow-sm);
      }

      .detail-card__icon svg {
        width: 22px;
        height: 22px;
        stroke: var(--brand);
        fill: none;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .detail-card__label {
        font-size: 12px;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 600;
        margin-bottom: 2px;
      }

      .detail-card__value {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      /* ── Photo row ──────────────────────────────────── */
      .photo-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 16px;
      }

      .photo-row__item {
        border-radius: var(--radius-md);
        overflow: hidden;
        aspect-ratio: 4/3;
      }

      .photo-row__item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .photo-row__item img:hover {
        transform: scale(1.04);
      }

      /* ── Reviews ────────────────────────────────────── */
      .reviews-summary {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 28px;
      }

      .reviews-summary__score {
        font-family: 'Lora', serif;
        font-size: 48px;
        font-weight: 600;
        line-height: 1;
      }

      .reviews-summary__right {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .reviews-summary__stars {
        color: var(--brand);
        font-size: 18px;
      }

      .reviews-summary__count {
        font-size: 14px;
        color: var(--text-secondary);
      }

      .reviews-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }

      .review-card {
      }

      .review-card__header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .review-card__avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
      }

      .review-card__name {
        font-size: 15px;
        font-weight: 600;
      }
      .review-card__date {
        font-size: 13px;
        color: var(--text-secondary);
      }

      .review-card__stars {
        color: var(--brand);
        font-size: 12px;
        margin-bottom: 8px;
      }

      .review-card__text {
        font-size: 14px;
        line-height: 1.65;
        color: var(--text-secondary);
      }

      /* ── Booking card ───────────────────────────────── */
      .booking-card {
        position: sticky;
        top: 24px;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 28px;
        box-shadow: var(--shadow-lg);
      }

      .booking-card__price {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 4px;
      }

      .booking-card__price span {
        font-size: 16px;
        font-weight: 400;
        color: var(--text-secondary);
      }

      .booking-card__rating {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .booking-card__rating strong {
        color: var(--text-primary);
      }

      .date-picker {
        border: 1px solid var(--text-primary);
        border-radius: var(--radius-md);
        overflow: hidden;
        margin-bottom: 12px;
      }

      .date-picker__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-bottom: 1px solid var(--border);
      }

      .date-picker__field {
        padding: 12px 14px;
        cursor: pointer;
      }
      .date-picker__field:first-child {
        border-right: 1px solid var(--border);
      }
      .date-picker__field:hover {
        background: var(--bg-subtle);
      }

      .date-picker__label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-primary);
        margin-bottom: 2px;
      }

      .date-picker__value {
        font-size: 14px;
        color: var(--text-secondary);
      }

      .guests-field {
        padding: 12px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      .guests-field:hover {
        background: var(--bg-subtle);
      }

      .guests-field__label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-primary);
      }

      .guests-field__value {
        font-size: 14px;
        color: var(--text-secondary);
      }

      .reserve-btn {
        width: 100%;
        background: linear-gradient(135deg, #ff385c, #e31c5f);
        color: var(--white);
        border: none;
        border-radius: var(--radius-md);
        padding: 16px;
        font-family: 'DM Sans', sans-serif;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 14px;
        transition:
          background 0.15s,
          box-shadow 0.15s;
        letter-spacing: -0.01em;
      }
      .reserve-btn:hover {
        background: linear-gradient(135deg, #e0294b, #c8215a);
        box-shadow: 0 4px 18px rgba(255, 56, 92, 0.35);
      }

      .booking-card__no-charge {
        text-align: center;
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 20px;
      }

      .price-breakdown {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .price-breakdown__row {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color: var(--text-secondary);
      }

      .price-breakdown__row--total {
        color: var(--text-primary);
        font-weight: 700;
        font-size: 16px;
        padding-top: 12px;
        border-top: 1px solid var(--border);
        margin-top: 4px;
      }

      .price-breakdown__row--underline span:first-child {
        text-decoration: underline;
        cursor: pointer;
      }

      /* ── Map placeholder ────────────────────────────── */
      .map-placeholder {
        border-radius: var(--radius-lg);
        overflow: hidden;
        height: 280px;
        background: var(--bg-subtle);
        position: relative;
        margin-top: 16px;
        border: 1px solid var(--border);
      }

      .map-placeholder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
      }

      .map-placeholder__label {
        position: absolute;
        bottom: 16px;
        left: 16px;
        background: var(--white);
        border-radius: var(--radius-sm);
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: var(--shadow-md);
      }

      /* ── Rare find banner ───────────────────────────── */
      .rare-find {
        display: flex;
        align-items: center;
        gap: 16px;
        background: var(--bg-subtle);
        border-radius: var(--radius-md);
        padding: 20px;
        margin-bottom: 20px;
      }

      .rare-find__icon {
        font-size: 28px;
        flex-shrink: 0;
      }

      .rare-find__title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 2px;
      }
      .rare-find__desc {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.4;
      }

      /* ── Tag pills ──────────────────────────────────── */
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }

      .tag {
        background: var(--bg-subtle);
        border: 1px solid var(--border);
        border-radius: var(--radius-pill);
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-primary);
        cursor: pointer;
        transition:
          border-color 0.15s,
          background 0.15s;
      }
      .tag:hover {
        border-color: var(--text-primary);
        background: var(--white);
      }

      /* ── Animations ─────────────────────────────────── */
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .gallery {
        animation: fadeUp 0.5s ease both;
      }
      .listing-header {
        animation: fadeUp 0.5s 0.1s ease both;
      }
      .content-grid {
        animation: fadeUp 0.5s 0.2s ease both;
      }

      .brand-star {
        color: var(--brand);
      }

      .guests-field__chevron {
        color: var(--text-secondary);
      }
    `,
  ],
})
export class PerspectivesTrailComponent {}
