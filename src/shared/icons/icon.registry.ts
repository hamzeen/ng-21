// src/shared/icons/icon.registry.ts

// icon.registry.ts
export function getIconPath(name: string): string {
  return `/svgs/${name}.svg`; // ✅ no "assets" anymore
}
