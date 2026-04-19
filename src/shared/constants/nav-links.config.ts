export interface NavLink {
  route: string;
  icon: string;
  label: string;
  exact?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  {
    route: '/',
    icon: 'fa-solid fa-list-check',
    label: 'My Tasks',
    exact: true,
  },
  {
    route: '/signal-computed-demo',
    icon: 'fa-solid fa-bolt',
    label: 'Signal Computed Demo',
  },
  {
    route: '/register',
    icon: 'fa-regular fa-user',
    label: 'User Registration',
  },
  {
    route: '/list',
    icon: 'fa-regular fa-rectangle-list',
    label: 'Invoice List',
  },
  {
    route: '/recipes',
    icon: 'fa-solid fa-utensils',
    label: 'Recipes',
  },
  {
    route: '/icon-doc',
    icon: 'fa-regular fa-rectangle-list',
    label: 'Icon Documentation',
  },
];
