import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getCurrentLocation, getLocationAddress } from '../utils/location';

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);
      
      // Get address for the location
      const addressData = await getLocationAddress(
        locationData.latitude,
        locationData.longitude
      );
      setAddress(addressData);
    } catch (err) {
      setError(err.message);
      Alert.alert(
        'Location Error',
        'Unable to get your location. Please make sure location permissions are enabled.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLocation = () => {
    loadLocation();
  };

  const formatCoordinate = (coord) => {
    return coord ? coord.toFixed(6) : 'N/A';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Location</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={refreshLocation}
          disabled={isLoading}
        >
          <Text style={styles.refreshButtonText}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={refreshLocation}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {location && !isLoading && (
          <View style={styles.locationContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Coordinates</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Latitude:</Text>
                <Text style={styles.value}>
                  {formatCoordinate(location.latitude)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Longitude:</Text>
                <Text style={styles.value}>
                  {formatCoordinate(location.longitude)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Accuracy:</Text>
                <Text style={styles.value}>
                  {location.accuracy ? `${location.accuracy.toFixed(0)}m` : 'N/A'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Last Updated:</Text>
                <Text style={styles.value}>
                  {formatTimestamp(location.timestamp)}
                </Text>
              </View>
            </View>

            {address && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                {address.name && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Place:</Text>
                    <Text style={styles.value}>{address.name}</Text>
                  </View>
                )}
                {address.street && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Street:</Text>
                    <Text style={styles.value}>{address.street}</Text>
                  </View>
                )}
                {address.city && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>{address.city}</Text>
                  </View>
                )}
                {address.region && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Region:</Text>
                    <Text style={styles.value}>{address.region}</Text>
                  </View>
                )}
                {address.country && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Country:</Text>
                    <Text style={styles.value}>{address.country}</Text>
                  </View>
                )}
                {address.postalCode && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Postal Code:</Text>
                    <Text style={styles.value}>{address.postalCode}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 5,
  },
  refreshButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  locationContainer: {
    paddingVertical: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
});