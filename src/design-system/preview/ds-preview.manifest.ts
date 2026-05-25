export interface DsPreviewItem {
  path: string;
  label: string;
  group: string;
  loadComponent: () => Promise<any>;
}

export const DS_PREVIEW_MANIFEST: DsPreviewItem[] = [
  {
    path: 'button',
    label: 'Button',
    group: 'Form Controls',
    loadComponent: () =>
      import('./pages/button-preview.component').then((m) => m.ButtonPreviewComponent),
  },
  {
    path: 'busy-button',
    label: 'Busy Button',
    group: 'Form Controls',
    loadComponent: () =>
      import('./pages/busy-button-preview.component').then((m) => m.BusyButtonPreviewComponent),
  },
  {
    path: 'toast',
    label: 'Toast',
    group: 'Components',
    loadComponent: () =>
      import('./pages/toast-preview.component').then((m) => m.ToastPreviewComponent),
  },
  {
    path: 'card',
    label: 'Card',
    group: 'Components',
    loadComponent: () =>
      import('./pages/card-preview.component').then((m) => m.CardPreviewComponent),
  },
  {
    path: 'timeline',
    label: 'Timeline',
    group: 'Components',
    loadComponent: () =>
      import('./pages/timeline-preview.component').then((m) => m.TimelinePreviewComponent),
  },
  {
    path: 'dialog',
    label: 'Dialog',
    group: 'Components',
    loadComponent: () =>
      import('./pages/dialog-preview.component').then((m) => m.DialogPreviewComponent),
  },
  {
    path: 'colors',
    label: 'Colors',
    group: 'Visual Language',
    loadComponent: () =>
      import('./pages/colors-preview.component').then((m) => m.ColorsPreviewComponent),
  },
  {
    path: 'icon',
    label: 'Icons',
    group: 'Visual Language',
    loadComponent: () => import('./pages/icon-preview.component').then((m) => m.IconDocComponent),
  },
  {
    path: 'typography',
    label: 'Typography',
    group: 'Visual Language',
    loadComponent: () =>
      import('./pages/typography-preview.component').then((m) => m.TypographyPreviewComponent),
  },
  {
    path: 'grid',
    label: 'Grid',
    group: 'Visual Language',
    loadComponent: () =>
      import('./pages/grid-preview.component').then((m) => m.GridPreviewComponent),
  },

  {
    path: 'host-highlights',
    label: 'Host Highlights',
    group: 'Organisms',
    loadComponent: () =>
      import('./pages/host-highlights-preview.component').then(
        (m) => m.HostHighlightsPreviewComponent,
      ),
  },
];
