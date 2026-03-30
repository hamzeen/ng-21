import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';

interface RandomUserResponse {
  results: Array<{
    name: { first: string; last: string };
    picture: { large: string };
  }>;
}

interface Invoice {
  id: string;
  client: string;
  avatar: string;
  amount: number;
  currency: string;
  issued: string;
  due: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-list.component.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-gray-50',
  },
})
export class InvoiceListComponent {
  private readonly invoiceMeta = [
    {
      id: '000004',
      amount: 20000,
      currency: 'USD',
      issued: 'Sept 28, 2019',
      due: 'Due in 3 days',
      status: 'Paid' as const,
    },
    {
      id: '000003',
      amount: 214000,
      currency: 'USD',
      issued: 'Sept 25, 2019',
      due: 'Due in 6 days',
      status: 'Paid' as const,
    },
    {
      id: '000002',
      amount: 20000,
      currency: 'USD',
      issued: 'Sept 14, 2019',
      due: 'Due in 2 weeks',
      status: 'Pending' as const,
    },
    {
      id: '000001',
      amount: 12000,
      currency: 'USD',
      issued: 'Sept 6, 2019',
      due: 'Due 3 weeks ago',
      status: 'Overdue' as const,
    },
  ];

  readonly invoicesResource = httpResource(
    () => ({
      url: `https://randomuser.me/api/?results=${this.invoiceMeta.length}&seed=invoices`,
      method: 'GET',
    }),
    {
      defaultValue: [],
      parse: (data: unknown): Invoice[] => {
        const response = data as RandomUserResponse;

        return response.results.map((user, index) => {
          const meta = this.invoiceMeta[index];

          return {
            id: meta.id,
            client: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.large,
            amount: meta.amount,
            currency: meta.currency,
            issued: meta.issued,
            due: meta.due,
            status: meta.status,
          };
        });
      },
    },
  );

  readonly invoices = this.invoicesResource.value;
  readonly isLoading = this.invoicesResource.isLoading;
  readonly error = this.invoicesResource.error;

  readonly hasValue = this.invoicesResource.hasValue;
}
