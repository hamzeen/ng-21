import { computed, effect, Injectable, signal } from '@angular/core';
import { Barista, BaristaShiftSession } from '../models/barista.model';
import { CoffeeShopState } from '../models/coffee-shop-state.model';
import { CoffeeOrder, OrderItem } from '../models/order.model';

const STORAGE_KEY = 'coffee-shop-demo-state';
const TABLET_SHIFT_STORAGE_PREFIX = 'coffee-shop-demo-tablet-shift-';
const LEGACY_TABLET_NAME_STORAGE_PREFIX = 'coffee-shop-demo-tablet-name-';

const INITIAL_STATE: CoffeeShopState = {
  orders: [],
  baristas: [],
  nextTokenNumber: 1,
};

export interface ClaimOrderResult {
  success: boolean;
  message: string;
  order?: CoffeeOrder;
}

export interface FulfillmentMetric {
  baristaName: string;
  tabletId: string;
  completedOrders: number;
  totalFulfillmentMs: number;
  averageFulfillmentMs: number;
}

export interface DailyFulfillmentSummary {
  completedOrders: number;
  totalFulfillmentMs: number;
  averageFulfillmentMs: number;
  leaderboard: FulfillmentMetric[];
  bestPerformer?: FulfillmentMetric;
}

@Injectable({ providedIn: 'root' })
export class CoffeeShopStore {
  private readonly state = signal<CoffeeShopState>(this.loadState());

  readonly orders = computed(() => this.state().orders);
  readonly baristas = computed(() => this.state().baristas);

  readonly pendingOrders = computed(() =>
    this.orders()
      .filter((order) => order.status === 'pending')
      .sort((a, b) => a.createdAt - b.createdAt),
  );

  readonly activeOrders = computed(() =>
    this.orders()
      .filter((order) => order.status !== 'completed')
      .sort((a, b) => a.createdAt - b.createdAt),
  );

  readonly completedOrders = computed(() =>
    this.orders()
      .filter((order) => order.status === 'completed')
      .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)),
  );

  readonly completedOrdersToday = computed(() => {
    const now = Date.now();

    return this.completedOrders().filter((order) =>
      order.completedAt ? this.isSameLocalDate(order.completedAt, now) : false,
    );
  });

  readonly totalCompletedToday = computed(() => this.completedOrdersToday().length);

  readonly dailyFulfillmentSummary = computed<DailyFulfillmentSummary>(() => {
    const fulfilledOrders = this.completedOrdersToday().filter((order) => order.claimedAt && order.completedAt);
    const totalFulfillmentMs = fulfilledOrders.reduce(
      (total, order) => total + ((order.completedAt ?? 0) - (order.claimedAt ?? 0)),
      0,
    );
    const groupedByBarista = new Map<string, FulfillmentMetric>();

    for (const order of fulfilledOrders) {
      const tabletId = order.assignedTabletId ?? 'unknown';
      const baristaName = order.assignedBaristaName ?? 'Unknown';
      const key = `${tabletId}:${baristaName}`;
      const duration = (order.completedAt ?? 0) - (order.claimedAt ?? 0);
      const existing = groupedByBarista.get(key) ?? {
        tabletId,
        baristaName,
        completedOrders: 0,
        totalFulfillmentMs: 0,
        averageFulfillmentMs: 0,
      };

      existing.completedOrders += 1;
      existing.totalFulfillmentMs += duration;
      existing.averageFulfillmentMs = existing.totalFulfillmentMs / existing.completedOrders;
      groupedByBarista.set(key, existing);
    }

    const leaderboard = Array.from(groupedByBarista.values())
      .sort((a, b) => {
        const completedOrderDifference = b.completedOrders - a.completedOrders;

        if (completedOrderDifference !== 0) {
          return completedOrderDifference;
        }

        return a.averageFulfillmentMs - b.averageFulfillmentMs;
      });

    return {
      completedOrders: fulfilledOrders.length,
      totalFulfillmentMs,
      averageFulfillmentMs: fulfilledOrders.length ? totalFulfillmentMs / fulfilledOrders.length : 0,
      leaderboard,
      bestPerformer: leaderboard[0],
    };
  });

  constructor() {
    effect(() => {
      this.persistState(this.state());
    });
  }

  createOrder(items: OrderItem[], customerName?: string): CoffeeOrder {
    const now = Date.now();
    const tokenNumber = this.state().nextTokenNumber;
    const order: CoffeeOrder = {
      id: crypto.randomUUID(),
      token: `A${tokenNumber.toString().padStart(2, '0')}`,
      customerName: customerName?.trim() || undefined,
      items: items.filter((item) => item.name.trim() && item.quantity > 0),
      status: 'pending',
      createdAt: now,
    };

    this.state.update((current) => ({
      ...current,
      nextTokenNumber: current.nextTokenNumber + 1,
      orders: [order, ...current.orders],
    }));

    return order;
  }

  registerBarista(tabletId: string, name: string): Barista {
    const normalizedTabletId = tabletId.trim();
    const normalizedName = name.trim();
    const now = Date.now();

    const existing = this.getBarista(normalizedTabletId);
    const isSameShiftDay = existing?.clockedInAt
      ? this.isSameLocalDate(existing.clockedInAt, now)
      : false;

    const barista: Barista = {
      tabletId: normalizedTabletId,
      name: normalizedName,
      activeOrderId: isSameShiftDay ? existing?.activeOrderId : undefined,
      completedCount: isSameShiftDay ? existing?.completedCount ?? 0 : 0,
      clockedInAt: isSameShiftDay ? existing!.clockedInAt : now,
      lastSeenAt: now,
    };

    this.upsertBarista(barista);
    this.persistShiftSession({
      tabletId: normalizedTabletId,
      name: normalizedName,
      clockedInAt: barista.clockedInAt,
    });

    return barista;
  }

  getBarista(tabletId: string): Barista | undefined {
    return this.state().baristas.find((barista) => barista.tabletId === tabletId);
  }

  getLastKnownBaristaName(tabletId: string): string {
    return this.getStoredShiftSession(tabletId)?.name
      ?? localStorage.getItem(this.legacyTabletNameStorageKey(tabletId))
      ?? '';
  }

  getTodaysShiftSession(tabletId: string): BaristaShiftSession | undefined {
    const session = this.getStoredShiftSession(tabletId);

    if (!session || !this.isSameLocalDate(session.clockedInAt, Date.now())) {
      return undefined;
    }

    return session;
  }

  ensureBaristaFromTodaysShift(tabletId: string): Barista | undefined {
    const existing = this.getBarista(tabletId);

    if (existing && this.isSameLocalDate(existing.clockedInAt, Date.now())) {
      return existing;
    }

    const session = this.getTodaysShiftSession(tabletId);

    if (!session) {
      return undefined;
    }

    const now = Date.now();
    const barista: Barista = {
      tabletId: session.tabletId,
      name: session.name,
      activeOrderId: existing?.activeOrderId,
      completedCount: existing?.completedCount ?? 0,
      clockedInAt: session.clockedInAt,
      lastSeenAt: now,
    };

    this.upsertBarista(barista);

    return barista;
  }

  getOrder(orderId: string): CoffeeOrder | undefined {
    return this.state().orders.find((order) => order.id === orderId);
  }

  getCurrentOrderForBarista(tabletId: string): CoffeeOrder | undefined {
    const barista = this.getBarista(tabletId);
    if (!barista?.activeOrderId) {
      return undefined;
    }

    return this.getOrder(barista.activeOrderId);
  }

  claimOrder(orderId: string, tabletId: string): ClaimOrderResult {
    const barista = this.getBarista(tabletId);

    if (!barista) {
      return {
        success: false,
        message: 'Please enter your barista name before picking an order.',
      };
    }

    if (barista.activeOrderId) {
      return {
        success: false,
        message: 'Complete your current order before picking another one.',
      };
    }

    const order = this.getOrder(orderId);

    if (!order) {
      return { success: false, message: 'Order was not found.' };
    }

    if (order.status !== 'pending') {
      return {
        success: false,
        message: `Order ${order.token} was already picked by ${order.assignedBaristaName ?? 'another barista'}.`,
        order,
      };
    }

    const now = Date.now();
    let claimedOrder: CoffeeOrder | undefined;

    this.state.update((current) => {
      const latestOrder = current.orders.find((item) => item.id === orderId);
      const latestBarista = current.baristas.find((item) => item.tabletId === tabletId);

      if (!latestOrder || !latestBarista || latestOrder.status !== 'pending' || latestBarista.activeOrderId) {
        return current;
      }

      claimedOrder = {
        ...latestOrder,
        status: 'in-progress',
        assignedTabletId: tabletId,
        assignedBaristaName: latestBarista.name,
        claimedAt: now,
      };

      return {
        ...current,
        orders: current.orders.map((item) => (item.id === orderId ? claimedOrder! : item)),
        baristas: current.baristas.map((item) =>
          item.tabletId === tabletId
            ? { ...item, activeOrderId: orderId, lastSeenAt: now }
            : item,
        ),
      };
    });

    if (!claimedOrder) {
      return {
        success: false,
        message: 'Order could not be picked. It may have already been taken.',
      };
    }

    return {
      success: true,
      message: `Order ${claimedOrder.token} picked successfully.`,
      order: claimedOrder,
    };
  }

  completeOrder(orderId: string, tabletId: string): void {
    const now = Date.now();

    this.state.update((current) => {
      const order = current.orders.find((item) => item.id === orderId);

      if (!order || order.assignedTabletId !== tabletId || order.status !== 'in-progress') {
        return current;
      }

      return {
        ...current,
        orders: current.orders.map((item) =>
          item.id === orderId ? { ...item, status: 'completed', completedAt: now } : item,
        ),
        baristas: current.baristas.map((barista) =>
          barista.tabletId === tabletId
            ? {
                ...barista,
                activeOrderId: undefined,
                completedCount: barista.completedCount + 1,
                lastSeenAt: now,
              }
            : barista,
        ),
      };
    });
  }

  resetDay(): void {
    this.state.set(INITIAL_STATE);
    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith(TABLET_SHIFT_STORAGE_PREFIX) ||
        key.startsWith(LEGACY_TABLET_NAME_STORAGE_PREFIX),
      )
      .forEach((key) => localStorage.removeItem(key));
  }

  seedDemoData(): void {
    if (this.orders().length > 0) {
      return;
    }

    this.registerBarista('tablet-1', 'Nimal');
    this.registerBarista('tablet-2', 'Sara');

    const completedOrder = this.createOrder([{ id: crypto.randomUUID(), name: 'Cappuccino', quantity: 1 }], 'Walk-in');
    const nimalOrder = this.createOrder([{ id: crypto.randomUUID(), name: 'Flat White', quantity: 2 }], 'Table 3');
    const saraOrder = this.createOrder([{ id: crypto.randomUUID(), name: 'Americano', quantity: 1 }]);

    this.claimOrder(completedOrder.id, 'tablet-1');
    this.completeOrder(completedOrder.id, 'tablet-1');
    this.claimOrder(nimalOrder.id, 'tablet-1');
    this.claimOrder(saraOrder.id, 'tablet-2');
  }

  private upsertBarista(barista: Barista): void {
    this.state.update((current) => ({
      ...current,
      baristas: [
        ...current.baristas.filter((item) => item.tabletId !== barista.tabletId),
        barista,
      ],
    }));
  }

  private persistShiftSession(session: BaristaShiftSession): void {
    localStorage.setItem(this.tabletShiftStorageKey(session.tabletId), JSON.stringify(session));
    localStorage.removeItem(this.legacyTabletNameStorageKey(session.tabletId));
  }

  private getStoredShiftSession(tabletId: string): BaristaShiftSession | undefined {
    const serializedSession = localStorage.getItem(this.tabletShiftStorageKey(tabletId));

    if (!serializedSession) {
      return undefined;
    }

    try {
      const session = JSON.parse(serializedSession) as BaristaShiftSession;

      if (!session.name || !session.clockedInAt) {
        return undefined;
      }

      return session;
    } catch {
      return undefined;
    }
  }

  private tabletShiftStorageKey(tabletId: string): string {
    return `${TABLET_SHIFT_STORAGE_PREFIX}${tabletId}`;
  }

  private legacyTabletNameStorageKey(tabletId: string): string {
    return `${LEGACY_TABLET_NAME_STORAGE_PREFIX}${tabletId}`;
  }

  private isSameLocalDate(timestamp: number, compareTimestamp: number): boolean {
    const date = new Date(timestamp);
    const compareDate = new Date(compareTimestamp);

    return date.getFullYear() === compareDate.getFullYear()
      && date.getMonth() === compareDate.getMonth()
      && date.getDate() === compareDate.getDate();
  }

  private loadState(): CoffeeShopState {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return INITIAL_STATE;
    }

    try {
      return this.normalizeState(JSON.parse(serializedState) as CoffeeShopState);
    } catch {
      return INITIAL_STATE;
    }
  }

  private normalizeState(state: CoffeeShopState): CoffeeShopState {
    const now = Date.now();

    return {
      ...INITIAL_STATE,
      ...state,
      orders: state.orders ?? [],
      baristas: (state.baristas ?? []).map((barista) => ({
        ...barista,
        clockedInAt: barista.clockedInAt ?? barista.lastSeenAt ?? now,
        lastSeenAt: barista.lastSeenAt ?? now,
        completedCount: barista.completedCount ?? 0,
      })),
      nextTokenNumber: state.nextTokenNumber ?? INITIAL_STATE.nextTokenNumber,
    };
  }

  private persistState(state: CoffeeShopState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}
