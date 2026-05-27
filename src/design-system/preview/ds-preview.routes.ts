import { Routes } from '@angular/router';
import { DS_PREVIEW_MANIFEST } from './ds-preview.manifest';

export const DS_PREVIEW_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ds-preview-shell.component').then((m) => m.DsPreviewShellComponent),
    children: [
      ...DS_PREVIEW_MANIFEST.map((item) => ({
        path: item.path,
        loadComponent: item.loadComponent,
      })),
      {
        path: '',
        redirectTo: DS_PREVIEW_MANIFEST[6].path,
        pathMatch: 'full' as const,
      },
    ],
  },
];
