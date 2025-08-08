import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeatherScreen from '../screens/WeatherScreen';

// Mock navigation
const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack,
};

describe('WeatherScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Date to have consistent test results
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z')); // Monday
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should render weather screen correctly', () => {
    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    expect(getByText('Weather Forecast')).toBeTruthy();
    expect(getByText('← Back')).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Wind')).toBeTruthy();
  });

  test('should navigate back when back button is pressed', () => {
    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    const backButton = getByText('← Back');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  test('should display today row with special styling', () => {
    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Look for today's date marker
    expect(getByText(/\(Today\)/)).toBeTruthy();
  });

  test('should display weather data with sun hours and wind speed', () => {
    const { getAllByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Check that we have weather data displayed (sun hours and wind speed)
    const sunElements = getAllByText(/\d+h/);
    const windElements = getAllByText(/\d+ km\/h/);

    expect(sunElements.length).toBeGreaterThan(0);
    expect(windElements.length).toBeGreaterThan(0);
  });

  test('should generate 22 days of weather data', () => {
    const { getAllByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Get all elements that match the pattern for dates
    const dateElements = getAllByText(/\w{3}, \w{3} \d+/);
    
    // Should have 22 date rows (7 before + 1 today + 14 after)
    expect(dateElements.length).toBe(22);
  });

  test('should format dates correctly', () => {
    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Check that dates are formatted as "Day, Month Date"
    // The exact dates will depend on the mock date we set
    expect(getByText(/Mon, Jan 15/)).toBeTruthy(); // Today
  });

  test('should display random but realistic weather values', () => {
    const { getAllByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Sun hours should be between 1-12 hours
    const sunElements = getAllByText(/\d+h/);
    sunElements.forEach(element => {
      const hours = parseInt(element.children[0].match(/\d+/)[0]);
      expect(hours).toBeGreaterThanOrEqual(1);
      expect(hours).toBeLessThanOrEqual(12);
    });

    // Wind speed should be between 5-34 km/h
    const windElements = getAllByText(/\d+ km\/h/);
    windElements.forEach(element => {
      const speed = parseInt(element.children[0].match(/\d+/)[0]);
      expect(speed).toBeGreaterThanOrEqual(5);
      expect(speed).toBeLessThanOrEqual(34);
    });
  });

  test('should handle navigation prop gracefully when missing', () => {
    // Test that component doesn't crash without navigation
    expect(() => {
      render(<WeatherScreen />);
    }).not.toThrow();
  });

  test('should mark today correctly regardless of current date', () => {
    // Test with different dates
    jest.setSystemTime(new Date('2024-06-15T12:00:00Z')); // Saturday

    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    expect(getByText(/\(Today\)/)).toBeTruthy();
    expect(getByText(/Sat, Jun 15/)).toBeTruthy();
  });

  test('should include dates from past and future', () => {
    const { getAllByText, getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Should include dates from 7 days before today
    // The component generates dates from 1 week before to 2 weeks after today
    const dateElements = getAllByText(/\w{3}, \w{3} \d+/);
    
    // First date should be 7 days before today (January 8, 2024)
    expect(getByText(/Mon, Jan 8/)).toBeTruthy();
    
    // Last date should be 14 days after today (January 29, 2024)  
    expect(getByText(/Mon, Jan 29/)).toBeTruthy();
  });

  test('should have correct table structure', () => {
    const { getByText } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    // Table headers
    expect(getByText('Date')).toBeTruthy();
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Wind')).toBeTruthy();
  });

  test('should show consistent data on multiple renders', () => {
    // Mock Math.random to ensure consistent results
    const mockMath = jest.spyOn(Math, 'random');
    mockMath.mockReturnValue(0.5);

    const { getAllByText: getFirstRender } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    const firstSunElements = getFirstRender(/\d+h/);
    const firstWindElements = getFirstRender(/\d+ km\/h/);

    // Re-render and check consistency
    const { getAllByText: getSecondRender } = render(
      <WeatherScreen navigation={mockNavigation} />
    );

    const secondSunElements = getSecondRender(/\d+h/);
    const secondWindElements = getSecondRender(/\d+ km\/h/);

    // Values should be the same since we mocked Math.random
    expect(firstSunElements[0].children[0]).toBe(secondSunElements[0].children[0]);
    expect(firstWindElements[0].children[0]).toBe(secondWindElements[0].children[0]);

    mockMath.mockRestore();
  });
});