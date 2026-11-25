export const ICON_PATHS = {
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.35-4.35'],
  'arrow-left': ['M19 12H5', 'm12 19-7-7 7-7'],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  trash: [
    'M3 6h18',
    'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
  ],
  board: ['M4 4h4v16H4z', 'M10 4h4v10h-4z', 'M16 4h4v13h-4z'],
  pencil: ['M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'],
  layers: ['m12 2 10 6-10 6L2 8z', 'm2 14 10 6 10-6'],
  check: ['M20 6 9 17l-5-5'],
} as const satisfies Record<string, readonly string[]>;

export type UiIconName = keyof typeof ICON_PATHS;
