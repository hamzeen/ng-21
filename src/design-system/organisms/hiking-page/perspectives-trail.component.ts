import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HostHighlightsComponent,
  HostHighlightItem,
} from '@design-system/molecules/host-highlights';

@Component({
  selector: 'app-perspectives-trail',
  standalone: true,
  imports: [CommonModule, HostHighlightsComponent],
  templateUrl: './perspectives-trail.component.html',
  styleUrl: './perspectives-trail.component.css',
})
export class PerspectivesTrailComponent {
  highlights: HostHighlightItem[] = [
    {
      icon: 'fa-solid fa-mountain',
      title: 'Breathtaking 360° panorama',
      description:
        'Stand above the clouds with views of over 90 Alpine peaks, stretching from the Zugspitze to the Dolomites on clear days.',
    },
    {
      icon: 'fa-solid fa-map',
      title: 'Expert local guidance included',
      description:
        'Your certified Alpenführer knows every boulder and wildflower. Safety briefing, gear check and cultural storytelling along the way.',
    },
    {
      icon: 'fa-solid fa-sun',
      title: 'Golden hour summit experience',
      description:
        'Timed to reach the Hafelekar peak at dusk — the Alpenglow turns the limestone cliffs a deep amber and rose.',
    },
  ];
}
