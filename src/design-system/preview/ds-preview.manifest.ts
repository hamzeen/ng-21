export interface DsPreviewItem {
  path: string;
  label: string;
  group: string;
  loadComponent: () => Promise<any>;
}

export const DS_PREVIEW_MANIFEST: DsPreviewItem[] = [
  {
    path: 'busy-button',
    label: 'Busy Button',
    group: 'Form Controls',
    loadComponent: () =>
      import('./pages/busy-button-preview.component').then((m) => m.BusyButtonPreviewComponent),
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
];
