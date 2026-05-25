import { Component } from '@angular/core';
import { TimelineComponent, TimelineItem } from '@design-system/components/timeline';

@Component({
  selector: 'ds-timeline-preview',
  standalone: true,
  imports: [TimelineComponent],
  template: `
    <div class="max-w-3xl">
      <h1 class="preview-title">Timeline</h1>
      <p class="preview-desc">
        A vertical timeline component for displaying sequential events, steps or history. Supports
        optional eyebrow, heading, description and per-item icons from a built-in registry —
        <code class="ds-code">mail</code>, <code class="ds-code">work</code>,
        <code class="ds-code">done</code>, <code class="ds-code">home</code>,
        <code class="ds-code">calendar</code>, <code class="ds-code">star</code>.
      </p>

      <!-- ── Default ────────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Default</h2>
        <p class="ds-section-desc">
          With <code class="ds-code">eyebrow</code>, <code class="ds-code">heading</code>,
          <code class="ds-code">description</code> and explicit icons per item.
        </p>
        <ds-timeline
          eyebrow="Your journey"
          heading="Booking timeline"
          description="A complete history of your reservation from search to stay."
          [items]="bookingItems"
        />
      </section>

      <!-- ── No header ──────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">No Header</h2>
        <p class="ds-section-desc">
          Omit <code class="ds-code">heading</code> to render a minimal list — useful when the
          surrounding page already provides context.
        </p>
        <ds-timeline [items]="minimalItems" />
      </section>

      <!-- ── Fallback icons ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Fallback Icons</h2>
        <p class="ds-section-desc">
          When no <code class="ds-code">icon</code> is set per item, the component cycles through
          <code class="ds-code">mail → work → done</code> automatically.
        </p>
        <ds-timeline heading="Auto icons" [items]="fallbackItems" />
      </section>

      <!-- ── All icons ──────────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Available Icons</h2>
        <p class="ds-section-desc">
          All six icons available via the
          <code class="ds-code">TimelineIcon</code> type.
        </p>
        <ds-timeline heading="Icon showcase" [items]="iconShowcase" />
      </section>

      <!-- ── Long content ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label">Long Content</h2>
        <p class="ds-section-desc">
          Description text wraps naturally. The connector line adjusts to the height of each item
          automatically.
        </p>
        <ds-timeline eyebrow="Case study" heading="Property listing history" [items]="longItems" />
      </section>

      <!-- ── API Reference ──────────────────────────── -->
      <section class="mb-12">
        <h2 class="ds-section-label mb-4">API Reference</h2>

        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Component inputs
        </p>
        <div class="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div
            class="grid grid-cols-4 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Input</span><span>Type</span><span>Default</span><span>Description</span>
          </div>
          @for (row of componentApi; track row.input) {
            <div
              class="grid grid-cols-4 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <code class="font-mono text-xs" style="color: #FF385C;">{{ row.input }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.type }}</code>
              <code class="text-gray-400 font-mono text-xs">{{ row.default }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>

        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          TimelineItem interface
        </p>
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div
            class="grid grid-cols-4 bg-gray-50 px-5 py-3
                      text-xs font-semibold uppercase tracking-wider text-gray-400
                      border-b border-gray-200"
          >
            <span>Field</span><span>Type</span><span>Required</span><span>Description</span>
          </div>
          @for (row of itemApi; track row.field) {
            <div
              class="grid grid-cols-4 px-5 py-3 text-sm
                        border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <code class="font-mono text-xs" style="color: #FF385C;">{{ row.field }}</code>
              <code class="text-gray-500 font-mono text-xs">{{ row.type }}</code>
              <code class="text-gray-400 font-mono text-xs">{{ row.required }}</code>
              <span class="text-gray-600 text-xs">{{ row.description }}</span>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .preview-title {
        font-size: 28px;
        font-weight: 700;
        color: #222;
        margin-bottom: 8px;
      }
      .preview-desc {
        font-size: 14px;
        color: #767676;
        line-height: 1.6;
        margin-bottom: 2.5rem;
      }
      .ds-section-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #9ca3af;
        margin-bottom: 4px;
      }
      .ds-section-desc {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .ds-code {
        background: #f4f4f4;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 12px;
        font-family: monospace;
        color: #ff385c;
      }
    `,
  ],
})
export class TimelinePreviewComponent {
  bookingItems: TimelineItem[] = [
    {
      icon: 'calendar',
      title: 'Search initiated',
      description: 'You searched for properties in Malibu for June 12–17, 2 guests.',
    },
    {
      icon: 'home',
      title: 'Property selected',
      description: 'Malibu Beach House added to your shortlist. Nightly rate locked at $248.',
    },
    {
      icon: 'mail',
      title: 'Request sent to host',
      description: 'Your booking request was sent. The host has 24 hours to respond.',
    },
    {
      icon: 'work',
      title: 'Payment processed',
      description: 'Payment of $1,240 was successfully charged to your Visa ending in 4242.',
    },
    {
      icon: 'done',
      title: 'Booking confirmed',
      description: 'Your stay is confirmed. Check-in instructions have been sent to your email.',
    },
  ];

  minimalItems: TimelineItem[] = [
    { icon: 'done', title: 'Account created', description: 'Welcome to the platform.' },
    {
      icon: 'mail',
      title: 'Email verified',
      description: 'Your email address has been confirmed.',
    },
    { icon: 'work', title: 'Profile completed', description: 'ID verification approved.' },
    { icon: 'calendar', title: 'First booking', description: 'You made your first reservation.' },
  ];

  fallbackItems: TimelineItem[] = [
    { title: 'Step one', description: 'No icon set — falls back to mail.' },
    { title: 'Step two', description: 'No icon set — falls back to work.' },
    { title: 'Step three', description: 'No icon set — falls back to done.' },
    { title: 'Step four', description: 'Cycle repeats — back to mail.' },
  ];

  iconShowcase: TimelineItem[] = [
    {
      icon: 'mail',
      title: 'Mail',
      description: 'Use for messages, notifications or email events.',
    },
    { icon: 'work', title: 'Work', description: 'Use for tasks, jobs or professional milestones.' },
    {
      icon: 'done',
      title: 'Done',
      description: 'Use for completions, approvals or confirmations.',
    },
    { icon: 'home', title: 'Home', description: 'Use for property, address or location events.' },
    {
      icon: 'calendar',
      title: 'Calendar',
      description: 'Use for dates, bookings or scheduled events.',
    },
    {
      icon: 'star',
      title: 'Star',
      description: 'Use for highlights, reviews or featured moments.',
    },
  ];

  longItems: TimelineItem[] = [
    {
      icon: 'home',
      title: 'Property listed',
      description:
        'The Malibu Beach House was listed on the platform after passing a quality review. Photos were uploaded, amenities confirmed and pricing set at $248 per night with a 3-night minimum stay requirement.',
    },
    {
      icon: 'star',
      title: 'Superhost status achieved',
      description:
        'After completing 15 stays with a 4.98 average rating, the host was awarded Superhost status. This badge is reviewed quarterly and requires maintaining a response rate above 90%.',
    },
    {
      icon: 'calendar',
      title: 'Peak season pricing applied',
      description:
        'Smart pricing automatically adjusted rates for the June–August period based on local demand, comparable listings and historical booking data.',
    },
  ];

  componentApi = [
    {
      input: 'heading',
      type: 'string',
      default: "''",
      description: 'Main heading above the timeline. Omit to hide the header.',
    },
    {
      input: 'eyebrow',
      type: 'string',
      default: "'Timeline'",
      description: 'Small label above the heading in brand color.',
    },
    {
      input: 'description',
      type: 'string',
      default: "''",
      description: 'Supporting text below the heading.',
    },
    {
      input: 'items',
      type: 'TimelineItem[]',
      default: '[]',
      description: 'Array of timeline entries to render.',
    },
  ];

  itemApi = [
    {
      field: 'title',
      type: 'string',
      required: 'Yes',
      description: 'Primary label for the timeline entry.',
    },
    {
      field: 'description',
      type: 'string',
      required: 'Yes',
      description: 'Supporting detail text. Wraps naturally.',
    },
    {
      field: 'icon',
      type: 'TimelineIcon',
      required: 'No',
      description: 'Icon key. Falls back to mail→work→done cycle if omitted.',
    },
  ];
}
