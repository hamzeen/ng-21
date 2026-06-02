export interface Barista {
  tabletId: string;
  name: string;
  activeOrderId?: string;
  completedCount: number;
  clockedInAt: number;
  lastSeenAt: number;
}

export interface BaristaShiftSession {
  tabletId: string;
  name: string;
  clockedInAt: number;
}
