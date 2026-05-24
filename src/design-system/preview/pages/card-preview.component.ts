import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@design-system/components/card';
import { ButtonComponent } from '@design-system/components/button';

@Component({
  selector: 'ds-card-preview',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="max-w-6xl">
      <h1 class="mb-2 text-3xl font-bold text-gray-900">Card</h1>

      <p class="mb-10 max-w-3xl text-sm leading-relaxed text-gray-500">
        A composable Airbnb-inspired card component. Supports simple strings, custom template slots,
        and every header/body/footer combination.
      </p>

      <!-- ── String API ───────────────────────────── -->
      <section class="mb-12">
        <h2 class="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          String API
        </h2>

        <p class="mb-5 text-sm text-gray-500">
          Pass simple string values for header, body and footer.
        </p>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ds-card
            [config]="{
              header: 'Malibu Beach House',
              body: 'Entire villa · 4 guests · 2 bedrooms',
              footer: '$240 night',
              variant: 'elevated',
            }"
          />

          <ds-card
            [config]="{
              header: 'Cozy apartment',
              body: 'Central location · 2 guests · 1 bedroom',
              variant: 'default',
            }"
          />

          <ds-card
            [config]="{
              body: 'A minimal body-only card. Useful for plain content blocks.',
              variant: 'outlined',
            }"
          />
        </div>
      </section>

      <!-- ── All Slot Combinations ────────────────── -->
      <section class="mb-12">
        <h2 class="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Slot Combinations
        </h2>

        <p class="mb-5 text-sm text-gray-500">Every header/body/footer permutation is supported.</p>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ds-card
            [config]="{
              header: 'Header only',
              variant: 'default',
            }"
          />

          <ds-card
            [config]="{
              body: 'Body only. No header or footer is rendered.',
              variant: 'default',
            }"
          />

          <ds-card
            [config]="{
              footer: 'Footer only',
              variant: 'default',
            }"
          />

          <ds-card
            [config]="{
              header: 'Header + Body',
              body: 'This card has no footer.',
              variant: 'elevated',
            }"
          />

          <ds-card
            [config]="{
              header: 'Header + Footer',
              footer: 'No body section.',
              variant: 'elevated',
            }"
          />

          <ds-card
            [config]="{
              body: 'Body + Footer. Useful when the title is handled outside.',
              footer: 'Footer content',
              variant: 'elevated',
            }"
          />

          <ds-card
            [config]="{
              header: 'Header + Body + Footer',
              body: 'All three sections are rendered.',
              footer: 'Footer content',
              variant: 'outlined',
            }"
          />
        </div>
      </section>

      <!-- ── Template API ─────────────────────────── -->
      <section class="mb-12">
        <h2 class="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Template API
        </h2>

        <p class="mb-5 text-sm text-gray-500">
          Pass custom Angular templates for full markup control.
        </p>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ds-card
            [config]="{
              headerTemplate: propertyHeaderTpl,
              bodyTemplate: propertyBodyTpl,
              footerTemplate: propertyFooterTpl,
              variant: 'elevated',
              padding: 'md',
            }"
          />

          <ds-card
            [config]="{
              headerTemplate: profileHeaderTpl,
              bodyTemplate: profileBodyTpl,
              variant: 'default',
              padding: 'md',
            }"
          />

          <ds-card
            [config]="{
              bodyTemplate: statsBodyTpl,
              footerTemplate: statsFooterTpl,
              variant: 'outlined',
              padding: 'md',
            }"
          />
        </div>
      </section>

      <!-- ── Mixed String + Template API ──────────── -->
      <section class="mb-12">
        <h2 class="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Mixed API
        </h2>

        <p class="mb-5 text-sm text-gray-500">
          You can mix strings and templates in the same card.
        </p>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ds-card
            [config]="{
              header: 'String header',
              bodyTemplate: propertyBodyTpl,
              footer: 'String footer',
              variant: 'elevated',
            }"
          />

          <ds-card
            [config]="{
              headerTemplate: propertyHeaderTpl,
              body: 'String body with a custom header and footer.',
              footerTemplate: propertyFooterTpl,
              variant: 'default',
            }"
          />

          <ds-card
            [config]="{
              header: 'Simple title',
              footerTemplate: actionFooterTpl,
              variant: 'outlined',
            }"
          />
        </div>
      </section>

      <!-- ── Variants + Padding ───────────────────── -->
      <section class="mb-12">
        <h2 class="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Variants & Padding
        </h2>

        <p class="mb-5 text-sm text-gray-500">Visual variants and spacing options.</p>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ds-card
            [config]="{
              header: 'Default',
              body: 'Bordered base card.',
              variant: 'default',
              padding: 'md',
            }"
          />

          <ds-card
            [config]="{
              header: 'Elevated',
              body: 'Soft Airbnb-style shadow.',
              variant: 'elevated',
              padding: 'md',
            }"
          />

          <ds-card
            [config]="{
              header: 'Outlined',
              body: 'Stronger border treatment.',
              variant: 'outlined',
              padding: 'md',
            }"
          />

          <ds-card
            [config]="{
              bodyTemplate: imageCardTpl,
              variant: 'elevated',
              padding: 'none',
            }"
          />
        </div>
      </section>
    </div>

    <!-- ── Templates ─────────────────────────────── -->

    <ng-template #propertyHeaderTpl>
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-base font-semibold leading-snug text-gray-900">Malibu Beach House</h3>
          <p class="mt-1 text-xs text-gray-400">Malibu, California</p>
        </div>

        <span class="shrink-0 text-sm font-medium text-gray-700">★ 4.92</span>
      </div>
    </ng-template>

    <ng-template #propertyBodyTpl>
      <div class="space-y-1">
        <p class="text-sm text-gray-600">Entire villa · 4 guests · 2 bedrooms</p>
        <p class="text-sm text-gray-400">Jun 12 – 17</p>
      </div>
    </ng-template>

    <ng-template #propertyFooterTpl>
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-gray-900">
          <span class="font-semibold">$240</span>
          <span class="text-gray-500"> night</span>
        </p>

        <ds-button variant="primary" size="md">Reserve</ds-button>
      </div>
    </ng-template>

    <ng-template #profileHeaderTpl>
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          H
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900">Hosted by Hamzeen</h3>
          <p class="text-xs text-gray-400">Superhost · 5 years hosting</p>
        </div>
      </div>
    </ng-template>

    <ng-template #profileBodyTpl>
      <p class="text-sm leading-relaxed text-gray-600">
        Friendly host with a strong track record of clean stays, quick replies and smooth check-ins.
      </p>
    </ng-template>

    <ng-template #statsBodyTpl>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div>
          <p class="text-lg font-bold text-gray-900">4.9</p>
          <p class="text-xs text-gray-400">Rating</p>
        </div>

        <div>
          <p class="text-lg font-bold text-gray-900">128</p>
          <p class="text-xs text-gray-400">Reviews</p>
        </div>

        <div>
          <p class="text-lg font-bold text-gray-900">2</p>
          <p class="text-xs text-gray-400">Years</p>
        </div>
      </div>
    </ng-template>

    <ng-template #statsFooterTpl>
      <p class="text-center text-xs text-gray-400">Guest favourite based on recent stays.</p>
    </ng-template>

    <ng-template #actionFooterTpl>
      <div class="flex justify-end gap-2">
        <button
          class="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          class="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </ng-template>

    <ng-template #imageCardTpl>
      <div>
        <div class="flex aspect-[4/3] items-center justify-center bg-gray-100">
          <span class="text-sm font-medium text-gray-400">Image area</span>
        </div>

        <div class="space-y-1 p-4">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-sm font-semibold text-gray-900">Lakeview cabin</h3>
            <span class="text-sm text-gray-700">★ 4.88</span>
          </div>

          <p class="text-sm text-gray-500">Norway · Mountain view</p>

          <p class="pt-1 text-sm text-gray-900">
            <span class="font-semibold">$180</span>
            <span class="text-gray-500"> night</span>
          </p>
        </div>
      </div>
    </ng-template>
  `,
})
export class CardPreviewComponent {
  @ViewChild('propertyHeaderTpl') propertyHeaderTpl!: TemplateRef<unknown>;
  @ViewChild('propertyBodyTpl') propertyBodyTpl!: TemplateRef<unknown>;
  @ViewChild('propertyFooterTpl') propertyFooterTpl!: TemplateRef<unknown>;

  @ViewChild('profileHeaderTpl') profileHeaderTpl!: TemplateRef<unknown>;
  @ViewChild('profileBodyTpl') profileBodyTpl!: TemplateRef<unknown>;

  @ViewChild('statsBodyTpl') statsBodyTpl!: TemplateRef<unknown>;
  @ViewChild('statsFooterTpl') statsFooterTpl!: TemplateRef<unknown>;

  @ViewChild('actionFooterTpl') actionFooterTpl!: TemplateRef<unknown>;
  @ViewChild('imageCardTpl') imageCardTpl!: TemplateRef<unknown>;
}
