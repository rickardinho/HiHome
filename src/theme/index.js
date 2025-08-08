import { colors } from './colors';

// Spacing system
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography system
const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 32,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

// Border radius system
const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  round: 999,
};

// Shadow system
const shadows = {
  small: {
    shadowColor: colors.shadow.main,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};