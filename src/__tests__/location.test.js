import * as Location from 'expo-location';
import {
  requestLocationPermission,
  getCurrentLocation,
  getLocationAddress,
  watchLocation,
} from '../utils/location';

// Mock expo-location
jest.mock('expo-location');

describe('Location Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestLocationPermission', () => {
    test('should return true when permission is granted', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValue({
        status: 'granted',
      });

      const result = await requestLocationPermission();

      expect(result).toBe(true);
      expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    });

    test('should return false when permission is denied', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValue({
        status: 'denied',
      });

      const result = await requestLocationPermission();

      expect(result).toBe(false);
      expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    });

    test('should return false and log error when request fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      Location.requestForegroundPermissionsAsync.mockRejectedValue(
        new Error('Permission request failed')
      );

      const result = await requestLocationPermission();

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error requesting location permission:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getCurrentLocation', () => {
    test('should return location data when permission is granted', async () => {
      const mockLocation = {
        coords: {
          latitude: 37.4219999,
          longitude: -122.0840575,
          accuracy: 5,
        },
        timestamp: 1640995200000,
      };

      Location.requestForegroundPermissionsAsync.mockResolvedValue({
        status: 'granted',
      });
      Location.getCurrentPositionAsync.mockResolvedValue(mockLocation);

      const result = await getCurrentLocation();

      expect(result).toEqual({
        latitude: mockLocation.coords.latitude,
        longitude: mockLocation.coords.longitude,
        accuracy: mockLocation.coords.accuracy,
        timestamp: mockLocation.timestamp,
      });
      expect(Location.getCurrentPositionAsync).toHaveBeenCalledWith({
        accuracy: Location.Accuracy.High,
      });
    });

    test('should throw error when permission is not granted', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValue({
        status: 'denied',
      });

      await expect(getCurrentLocation()).rejects.toThrow(
        'Location permission not granted'
      );
      expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
    });

    test('should throw error when location request fails', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValue({
        status: 'granted',
      });
      Location.getCurrentPositionAsync.mockRejectedValue(
        new Error('Location unavailable')
      );

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(getCurrentLocation()).rejects.toThrow('Location unavailable');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting current location:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getLocationAddress', () => {
    test('should return address data when reverse geocoding succeeds', async () => {
      const mockAddress = {
        street: '1 Hacker Way',
        city: 'Menlo Park',
        region: 'CA',
        country: 'United States',
        postalCode: '94025',
        name: 'Facebook HQ',
      };

      Location.reverseGeocodeAsync.mockResolvedValue([mockAddress]);

      const result = await getLocationAddress(37.4219999, -122.0840575);

      expect(result).toEqual(mockAddress);
      expect(Location.reverseGeocodeAsync).toHaveBeenCalledWith({
        latitude: 37.4219999,
        longitude: -122.0840575,
      });
    });

    test('should return null when no address is found', async () => {
      Location.reverseGeocodeAsync.mockResolvedValue([]);

      const result = await getLocationAddress(0, 0);

      expect(result).toBe(null);
    });

    test('should return null and log error when reverse geocoding fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      Location.reverseGeocodeAsync.mockRejectedValue(
        new Error('Reverse geocoding failed')
      );

      const result = await getLocationAddress(37.4219999, -122.0840575);

      expect(result).toBe(null);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting location address:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('watchLocation', () => {
    test('should call Location.watchPositionAsync with default options', () => {
      const mockCallback = jest.fn();
      const mockWatcher = { remove: jest.fn() };
      Location.watchPositionAsync.mockReturnValue(mockWatcher);

      const result = watchLocation(mockCallback);

      expect(Location.watchPositionAsync).toHaveBeenCalledWith(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 1,
        },
        mockCallback
      );
      expect(result).toBe(mockWatcher);
    });

    test('should call Location.watchPositionAsync with custom options', () => {
      const mockCallback = jest.fn();
      const mockWatcher = { remove: jest.fn() };
      const customOptions = {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      };
      Location.watchPositionAsync.mockReturnValue(mockWatcher);

      const result = watchLocation(mockCallback, customOptions);

      expect(Location.watchPositionAsync).toHaveBeenCalledWith(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        mockCallback
      );
      expect(result).toBe(mockWatcher);
    });

    test('should merge custom options with defaults', () => {
      const mockCallback = jest.fn();
      const mockWatcher = { remove: jest.fn() };
      const partialOptions = {
        timeInterval: 15000,
      };
      Location.watchPositionAsync.mockReturnValue(mockWatcher);

      watchLocation(mockCallback, partialOptions);

      expect(Location.watchPositionAsync).toHaveBeenCalledWith(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 15000,
          distanceInterval: 1,
        },
        mockCallback
      );
    });
  });
});