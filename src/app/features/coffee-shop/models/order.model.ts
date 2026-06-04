import { OrderStatus } from './order-status.model';

export type PaymentMode = 'manual' | 'card';
export type PaymentStatus = 'not-started' | 'pending' | 'paid' | 'cancelled' | 'failed';
export type OrderCurrency = 'EUR';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface CoffeeOrder {
  id: string;
  token: string;
  customerName?: string;
  items: OrderItem[];
  totalAmount: number;
  currency: OrderCurrency;
  status: OrderStatus;
  paymentMode?: PaymentMode;
  paymentStatus?: PaymentStatus;
  paymentCompletedAt?: number;
  receiptPrintRequested?: boolean;
  receiptPrintedAt?: number;
  assignedTabletId?: string;
  assignedBaristaName?: string;
  createdAt: number;
  claimedAt?: number;
  completedAt?: number;
}
