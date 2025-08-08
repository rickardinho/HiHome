import { theme } from '../theme';
import { colors } from '../theme/colors';

describe('Theme System', () => {
  describe('theme object', () => {
    test('should have all required properties', () => {
      expect(theme).toHaveProperty('colors');
      expect(theme).toHaveProperty('spacing');
      expect(theme).toHaveProperty('typography');
      expect(theme).toHaveProperty('borderRadius');
      expect(theme).toHaveProperty('shadows');
    });

    test('should have correct spacing values', () => {
      expect(theme.spacing).toEqual({
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      });
    });

    test('should have correct typography values', () => {
      expect(theme.typography).toHaveProperty('sizes');
      expect(theme.typography).toHaveProperty('weights');
      
      expect(theme.typography.sizes).toEqual({
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        title: 32,
      });

      expect(theme.typography.weights).toEqual({
        light: '300',
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      });
    });

    test('should have correct border radius values', () => {
      expect(theme.borderRadius).toEqual({
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        round: 999,
      });
    });

    test('should have shadow configurations', () => {
      expect(theme.shadows).toHaveProperty('small');
      expect(theme.shadows).toHaveProperty('medium');
      expect(theme.shadows).toHaveProperty('large');

      // Check shadow structure
      Object.values(theme.shadows).forEach(shadow => {
        expect(shadow).toHaveProperty('shadowColor');
        expect(shadow).toHaveProperty('shadowOffset');
        expect(shadow).toHaveProperty('shadowOpacity');
        expect(shadow).toHaveProperty('shadowRadius');
        expect(shadow).toHaveProperty('elevation');
      });
    });

    test('should reference colors correctly', () => {
      expect(theme.colors).toBe(colors);
    });
  });

  describe('colors system', () => {
    test('should have all color categories', () => {
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('accent');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('status');
      expect(colors).toHaveProperty('border');
      expect(colors).toHaveProperty('shadow');
    });

    test('should have correct primary colors', () => {
      expect(colors.primary).toHaveProperty('main');
      expect(colors.primary).toHaveProperty('light');
      expect(colors.primary).toHaveProperty('dark');
      
      expect(typeof colors.primary.main).toBe('string');
      expect(colors.primary.main).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    test('should have status colors', () => {
      expect(colors.status).toHaveProperty('success');
      expect(colors.status).toHaveProperty('error');
      expect(colors.status).toHaveProperty('warning');
      expect(colors.status).toHaveProperty('info');
    });

    test('should have text colors', () => {
      expect(colors.text).toHaveProperty('primary');
      expect(colors.text).toHaveProperty('secondary');
      expect(colors.text).toHaveProperty('light');
      expect(colors.text).toHaveProperty('white');
    });

    test('should have background colors', () => {
      expect(colors.background).toHaveProperty('primary');
      expect(colors.background).toHaveProperty('secondary');
      expect(colors.background).toHaveProperty('card');
      expect(colors.background).toHaveProperty('overlay');
    });

    test('should have border colors', () => {
      expect(colors.border).toHaveProperty('light');
      expect(colors.border).toHaveProperty('main');
      expect(colors.border).toHaveProperty('dark');
    });

    test('should have shadow colors', () => {
      expect(colors.shadow).toHaveProperty('light');
      expect(colors.shadow).toHaveProperty('main');
      expect(colors.shadow).toHaveProperty('dark');
    });
  });

  describe('theme consistency', () => {
    test('should use consistent shadow colors from color palette', () => {
      const shadowColors = [
        theme.shadows.small.shadowColor,
        theme.shadows.medium.shadowColor,
        theme.shadows.large.shadowColor,
      ];

      shadowColors.forEach(shadowColor => {
        const isValidColor = Object.values(colors.shadow).includes(shadowColor);
        expect(isValidColor).toBe(true);
      });
    });

    test('should have progressive shadow values', () => {
      const { small, medium, large } = theme.shadows;

      // Elevation should increase
      expect(small.elevation).toBeLessThan(medium.elevation);
      expect(medium.elevation).toBeLessThan(large.elevation);

      // Shadow radius should increase
      expect(small.shadowRadius).toBeLessThan(medium.shadowRadius);
      expect(medium.shadowRadius).toBeLessThan(large.shadowRadius);

      // Opacity should generally increase
      expect(small.shadowOpacity).toBeLessThanOrEqual(medium.shadowOpacity);
    });

    test('should have proper spacing progression', () => {
      const spacingValues = Object.values(theme.spacing);
      
      // Values should be in ascending order
      for (let i = 1; i < spacingValues.length; i++) {
        expect(spacingValues[i]).toBeGreaterThan(spacingValues[i - 1]);
      }
    });

    test('should have proper typography size progression', () => {
      const { xs, sm, md, lg, xl, xxl, title } = theme.typography.sizes;
      
      expect(xs).toBeLessThan(sm);
      expect(sm).toBeLessThan(md);
      expect(md).toBeLessThan(lg);
      expect(lg).toBeLessThan(xl);
      expect(xl).toBeLessThan(xxl);
      expect(xxl).toBeLessThan(title);
    });

    test('should have valid CSS font weights', () => {
      const weights = Object.values(theme.typography.weights);
      const validWeights = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
      
      weights.forEach(weight => {
        expect(validWeights).toContain(weight);
      });
    });
  });
});