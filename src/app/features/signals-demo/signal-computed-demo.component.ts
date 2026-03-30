import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  name: string;
  price: number;
}

@Component({
  selector: 'app-signal-computed-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-computed-demo.component.html',
})
export class SignalComputedDemoComponent {
  items = signal<Item[]>([
    { name: 'Book', price: 10 },
    { name: 'Pen', price: 2 },
    { name: 'Bag', price: 25 },
  ]);
  taxRate = signal(0.18);

  setTaxRate(val: string) {
    const num = Number(val);
    if (!isNaN(num)) {
      this.taxRate.set(num);
    }
  }

  total = computed(() => this.items().reduce((s, i) => s + i.price, 0) * (1 + this.taxRate()));
}
