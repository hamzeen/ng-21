import { OrderStatus } from './order-status.model';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

export interface CoffeeOrder {
  id: string;
  token: string;
  customerName?: string;
  items: OrderItem[];
  status: OrderStatus;
  assignedTabletId?: string;
  assignedBaristaName?: string;
  createdAt: number;
  claimedAt?: number;
  completedAt?: number;
}
