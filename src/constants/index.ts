import { SidebarLink } from '@/types';

export const themes = [
  { value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
  { value: 'system', label: 'System', icon: '/assets/icons/computer.svg' }
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/question.svg',
    route: '/dashboard/user-metrics',
    label: 'Dashboard',
    nestedLinks: [
      {
        route: '/dashboard/user-metrics',
        label: 'User Metrics'
      },
      {
        route: '/dashboard/live-map',
        label: 'Live Map'
      },
      {
        route: '/dashboard/customer-metrics',
        label: 'Customer Metrics'
      }
    ]
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/admin',
    label: 'Admin'
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: '/users',
    label: 'Users'
  },
  {
    imgURL: '/assets/icons/suitcase.svg',
    route: '/entities',
    label: 'Entities'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/timeline',
    label: 'Timeline'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/transactions',
    label: 'Transactions'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/inventory',
    label: 'Inventory'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/reporting',
    label: 'Settings'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/field-agents',
    label: 'Field Agents'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/forms',
    label: 'Forms'
  }
];
