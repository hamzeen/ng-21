import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimelineComponent, TimelineItem } from '@design-system/components/timeline';

@Component({
  selector: 'ds-timeline-preview',
  standalone: true,
  imports: [TimelineComponent],
  template: `
    <main class="min-h-screen p-4 sm:p-6 lg:p-10">
      <div class="mx-auto max-w-3xl">
        <ds-timeline
          eyebrow="Booking flow"
          heading="How it works"
          description="A simple responsive timeline component with clean design-system defaults."
          [items]="items"
        />
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePreviewComponent {
  items: TimelineItem[] = [
    {
      title: 'Start',
      icon: 'calendar',
      description:
        'Book an appointment and choose one of the available locations as your point of departure or arrival.',
    },
    {
      title: 'Work',
      icon: 'work',
      description:
        'Visit the kiosk, scan your booking details, and follow the guided flow. This text is intentionally longer to make sure it wraps nicely on smaller screens without overflowing or becoming invisible.',
    },
    {
      title: 'Finish',
      icon: 'done',
      description:
        'Complete the process and receive your confirmation. The layout keeps the icon column stable while allowing the content area to wrap naturally.',
    },
  ];
}
