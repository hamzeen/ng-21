export type TimelineIcon = 'mail' | 'work' | 'done' | 'home' | 'calendar' | 'star';

export interface TimelineItem {
  title: string;
  description: string;
  icon?: TimelineIcon;
}
