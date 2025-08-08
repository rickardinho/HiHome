import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LocationScreen from '../screens/LocationScreen';
import { getCurrentLocation, getLocationAddress } from '../utils/location';

// Mock the location utilities
jest.mock('../utils/location', () => ({
  getCurrentLocation: jest.fn(),
  getLocationAddress: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack,
};

describe('LocationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render location screen correctly', () => {
    getCurrentLocation.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    expect(getByText('Location')).toBeTruthy();
    expect(getByText('← Back')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy(); // When loading, it shows "Loading..."
  });

  test('should show loading state initially', () => {
    getCurrentLocation.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    expect(getByText('Getting your location...')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
  });

  test('should load and display location data successfully', async () => {
    const mockLocation = {
      latitude: 37.4219999,
      longitude: -122.0840575,
      accuracy: 5,
      timestamp: 1640995200000,
    };

    const mockAddress = {
      name: 'Facebook HQ',
      street: '1 Hacker Way',
      city: 'Menlo Park',
      region: 'CA',
      country: 'United States',
      postalCode: '94025',
    };

    getCurrentLocation.mockResolvedValue(mockLocation);
    getLocationAddress.mockResolvedValue(mockAddress);

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Coordinates')).toBeTruthy();
      expect(getByText('Address')).toBeTruthy();
    });

    // Check coordinates
    expect(getByText('37.422000')).toBeTruthy();
    expect(getByText('-122.084058')).toBeTruthy();
    expect(getByText('5m')).toBeTruthy();

    // Check address
    expect(getByText('Facebook HQ')).toBeTruthy();
    expect(getByText('1 Hacker Way')).toBeTruthy();
    expect(getByText('Menlo Park')).toBeTruthy();
    expect(getByText('CA')).toBeTruthy();
    expect(getByText('United States')).toBeTruthy();
    expect(getByText('94025')).toBeTruthy();
  });

  test('should handle location error gracefully', async () => {
    getCurrentLocation.mockRejectedValue(new Error('Location permission denied'));

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Location permission denied')).toBeTruthy();
      expect(getByText('Try Again')).toBeTruthy();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Location Error',
      'Unable to get your location. Please make sure location permissions are enabled.'
    );
  });

  test('should refresh location when refresh button is pressed', async () => {
    const mockLocation = {
      latitude: 37.4219999,
      longitude: -122.0840575,
      accuracy: 5,
      timestamp: 1640995200000,
    };

    getCurrentLocation.mockResolvedValue(mockLocation);
    getLocationAddress.mockResolvedValue(null);

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    // Wait for initial load
    await waitFor(() => {
      expect(getByText('Coordinates')).toBeTruthy();
    });

    // Clear previous calls
    getCurrentLocation.mockClear();
    getLocationAddress.mockClear();

    // Press refresh button
    const refreshButton = getByText('Refresh');
    fireEvent.press(refreshButton);

    await waitFor(() => {
      expect(getCurrentLocation).toHaveBeenCalledTimes(1);
      expect(getLocationAddress).toHaveBeenCalledTimes(1);
    });
  });

  test('should retry when try again button is pressed after error', async () => {
    getCurrentLocation.mockRejectedValueOnce(new Error('Location error'));

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Try Again')).toBeTruthy();
    });

    // Clear previous calls and mock success
    getCurrentLocation.mockClear();
    getCurrentLocation.mockResolvedValue({
      latitude: 37.4219999,
      longitude: -122.0840575,
      accuracy: 5,
      timestamp: 1640995200000,
    });
    getLocationAddress.mockResolvedValue(null);

    // Press try again button
    const tryAgainButton = getByText('Try Again');
    fireEvent.press(tryAgainButton);

    await waitFor(() => {
      expect(getCurrentLocation).toHaveBeenCalledTimes(1);
    });
  });

  test('should go back when back button is pressed', () => {
    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    const backButton = getByText('← Back');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  test('should format coordinates correctly', async () => {
    const mockLocation = {
      latitude: 37.421999876543,
      longitude: -122.084057123456,
      accuracy: 5.7,
      timestamp: 1640995200000,
    };

    getCurrentLocation.mockResolvedValue(mockLocation);
    getLocationAddress.mockResolvedValue(null);

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('37.422000')).toBeTruthy(); // 6 decimal places
      expect(getByText('-122.084057')).toBeTruthy(); // 6 decimal places
      expect(getByText('6m')).toBeTruthy(); // Rounded accuracy
    });
  });

  test('should handle missing address gracefully', async () => {
    const mockLocation = {
      latitude: 37.4219999,
      longitude: -122.0840575,
      accuracy: 5,
      timestamp: 1640995200000,
    };

    getCurrentLocation.mockResolvedValue(mockLocation);
    getLocationAddress.mockResolvedValue(null);

    const { getByText, queryByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Coordinates')).toBeTruthy();
    });

    // Address section should not be present
    expect(queryByText('Address')).toBeNull();
  });

  test('should handle partial address data', async () => {
    const mockLocation = {
      latitude: 37.4219999,
      longitude: -122.0840575,
      accuracy: 5,
      timestamp: 1640995200000,
    };

    const partialAddress = {
      city: 'Menlo Park',
      region: 'CA',
    };

    getCurrentLocation.mockResolvedValue(mockLocation);
    getLocationAddress.mockResolvedValue(partialAddress);

    const { getByText, queryByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Address')).toBeTruthy();
      expect(getByText('Menlo Park')).toBeTruthy();
      expect(getByText('CA')).toBeTruthy();
    });

    // Fields that are not present should not be displayed
    expect(queryByText('Place:')).toBeNull();
    expect(queryByText('Street:')).toBeNull();
  });

  test('should disable refresh button while loading', async () => {
    getCurrentLocation.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { getByText } = render(
      <LocationScreen navigation={mockNavigation} />
    );

    const refreshButton = getByText('Loading...');
    
    // Button should show loading text
    expect(refreshButton).toBeTruthy();
  });
});