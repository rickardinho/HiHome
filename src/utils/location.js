import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw error;
  }
};

export const getLocationAddress = async (latitude, longitude) => {
  try {
    const addressResponse = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addressResponse.length > 0) {
      const address = addressResponse[0];
      return {
        street: address.street,
        city: address.city,
        region: address.region,
        country: address.country,
        postalCode: address.postalCode,
        name: address.name,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting location address:', error);
    return null;
  }
};

export const watchLocation = (callback, options = {}) => {
  const defaultOptions = {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000,
    distanceInterval: 1,
    ...options,
  };

  return Location.watchPositionAsync(defaultOptions, callback);
};