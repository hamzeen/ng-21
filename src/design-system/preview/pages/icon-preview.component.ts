import { Component } from '@angular/core';
// remove line 2 (commented out) and fix line 3:
import { IconComponent } from '@design-system/components/icon';
import { IconSize } from '@shared/icon-system/icon.types';

@Component({
  selector: 'app-icon-doc',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="p-6 space-y-10">
      <h1 class="text-2xl font-semibold">Icon Component</h1>

      <!-- Available Icons -->
      <section>
        <h2 class="text-lg font-medium mb-4">Available Icons</h2>
        <div class="flex flex-wrap gap-6">
          @for (icon of icons; track icon) {
            <div
              class="w-full md:w-[calc((100%-3rem)/3)] rounded-lg p-6 flex flex-col items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <app-icon [name]="icon" size="m" />
              <span class="text-gray-600">{{ icon }}</span>
            </div>
          }
        </div>
      </section>

      <!-- Icon Sizes -->
      <section>
        <h2 class="text-lg font-medium mb-4">Icon Sizes</h2>
        <div class="flex flex-wrap gap-6">
          @for (size of sizes; track size) {
            <div
              class="w-full md:w-[calc((100%-3rem)/3)] rounded-lg p-6 flex flex-col items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <app-icon name="house" [size]="size.value" />
              <span>{{ size.label }}</span>
            </div>
          }
        </div>
      </section>

      <!-- Colors -->
      <section>
        <h2 class="text-lg font-medium mb-4">Colors</h2>
        <div class="flex gap-6 items-center">
          <app-icon name="house" class="text-black" />
          <app-icon name="house" class="text-blue-500" />
          <app-icon name="house" class="text-red-500" />
          <div class="bg-black p-2 rounded">
            <app-icon name="house" class="text-white" />
          </div>
        </div>
      </section>
    </div>
  `,
})
export class IconDocComponent {
  icons = ['house', 'user', 'speedometer'];

  sizes: { value: IconSize; label: string }[] = [
    { value: 's', label: 'Small (8px)' },
    { value: 'm', label: 'Medium (16px)' },
    { value: 'l', label: 'Large (24px)' },
  ];
}
