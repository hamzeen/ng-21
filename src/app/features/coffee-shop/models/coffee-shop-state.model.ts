import { Barista } from './barista.model';
import { CoffeeOrder } from './order.model';

export interface CoffeeShopState {
  orders: CoffeeOrder[];
  baristas: Barista[];
  nextTokenNumber: number;
}
