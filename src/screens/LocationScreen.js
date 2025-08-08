import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getCurrentLocation, getLocationAddress } from '../utils/location';
import {
  SafeContainer,
  HeaderContainer,
  HeaderButton,
  HeaderButtonText,
  HeaderTitle,
  Card,
  Title,
  Row,
  Label,
  ValueText,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  ErrorButton,
  ErrorButtonText,
  AccentButton,
  ButtonText,
} from '../theme/components';
import styled from 'styled-components/native';
import { theme } from '../theme';

const ContentScrollView = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${theme.spacing.lg}px;
`;

const LocationContainer = styled.View`
  padding-vertical: ${theme.spacing.lg}px;
`;

const SearchButtonContainer = styled.View`
  padding-vertical: ${theme.spacing.lg}px;
  align-items: center;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.sizes.xl}px;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

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
    <SafeContainer>
      <HeaderContainer>
        <HeaderButton onPress={() => navigation.goBack()}>
          <HeaderButtonText>← Back</HeaderButtonText>
        </HeaderButton>
        <HeaderTitle>Location</HeaderTitle>
        <HeaderButton
          onPress={refreshLocation}
          disabled={isLoading}
        >
          <HeaderButtonText>
            {isLoading ? 'Loading...' : 'Refresh'}
          </HeaderButtonText>
        </HeaderButton>
      </HeaderContainer>

      <ContentScrollView>
        {!isLoading && !location && !error && (
          <SearchButtonContainer>
            <AccentButton onPress={refreshLocation}>
              <ButtonText>Search for my location</ButtonText>
            </AccentButton>
          </SearchButtonContainer>
        )}

        {isLoading && (
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <LoadingText>Getting your location...</LoadingText>
          </LoadingContainer>
        )}

        {error && (
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
            <ErrorButton onPress={refreshLocation}>
              <ErrorButtonText>Try Again</ErrorButtonText>
            </ErrorButton>
          </ErrorContainer>
        )}

        {location && !isLoading && (
          <LocationContainer>
            <SearchButtonContainer>
              <AccentButton onPress={refreshLocation}>
                <ButtonText>Search for my location</ButtonText>
              </AccentButton>
            </SearchButtonContainer>

            <Card shadow>
              <SectionTitle>Coordinates</SectionTitle>
              <Row>
                <Label>Latitude:</Label>
                <ValueText>
                  {formatCoordinate(location.latitude)}
                </ValueText>
              </Row>
              <Row>
                <Label>Longitude:</Label>
                <ValueText>
                  {formatCoordinate(location.longitude)}
                </ValueText>
              </Row>
              <Row>
                <Label>Accuracy:</Label>
                <ValueText>
                  {location.accuracy ? `${location.accuracy.toFixed(0)}m` : 'N/A'}
                </ValueText>
              </Row>
              <Row>
                <Label>Last Updated:</Label>
                <ValueText>
                  {formatTimestamp(location.timestamp)}
                </ValueText>
              </Row>
            </Card>

            {address && (
              <Card shadow>
                <SectionTitle>Address</SectionTitle>
                {address.name && (
                  <Row>
                    <Label>Place:</Label>
                    <ValueText>{address.name}</ValueText>
                  </Row>
                )}
                {address.street && (
                  <Row>
                    <Label>Street:</Label>
                    <ValueText>{address.street}</ValueText>
                  </Row>
                )}
                {address.city && (
                  <Row>
                    <Label>City:</Label>
                    <ValueText>{address.city}</ValueText>
                  </Row>
                )}
                {address.region && (
                  <Row>
                    <Label>Region:</Label>
                    <ValueText>{address.region}</ValueText>
                  </Row>
                )}
                {address.country && (
                  <Row>
                    <Label>Country:</Label>
                    <ValueText>{address.country}</ValueText>
                  </Row>
                )}
                {address.postalCode && (
                  <Row>
                    <Label>Postal Code:</Label>
                    <ValueText>{address.postalCode}</ValueText>
                  </Row>
                )}
              </Card>
            )}
          </LocationContainer>
        )}
      </ContentScrollView>
    </SafeContainer>
  );
}

