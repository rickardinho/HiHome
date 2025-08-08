import React from 'react';
import {
  Alert,
  View,
} from 'react-native';
import { useAuth } from '../auth/AuthContext';
import {
  SafeContainer,
  ContentContainer,
  Title,
  Subtitle,
  AccentButton,
  SecondaryButton,
  ButtonText,
  SecondaryButtonText,
  LogoutButton,
  LogoutButtonText,
} from '../theme/components';
import styled from 'styled-components/native';
import { theme } from '../theme';

const HomeHeader = styled.View`
  align-items: center;
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const ActionsContainer = styled.View`
  flex: 1;
`;

const FooterContainer = styled.View`
  padding-bottom: ${theme.spacing.lg}px;
`;

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const navigateToLocation = () => {
    navigation.navigate('Location');
  };

  const navigateToWeather = () => {
    navigation.navigate('Weather');
  };

  const navigateToGardenMap = () => {
    navigation.navigate('GardenMap');
  };

  return (
    <SafeContainer>
      <ContentContainer>
        <HomeHeader>
          <Title>Welcome Home!</Title>
          <Subtitle>
            Hello, {user?.name || 'User'}
          </Subtitle>
        </HomeHeader>

        <ActionsContainer>
          <AccentButton onPress={navigateToLocation}>
            <ButtonText>View Location</ButtonText>
          </AccentButton>

          <SecondaryButton onPress={navigateToGardenMap}>
            <SecondaryButtonText>Garden Map</SecondaryButtonText>
          </SecondaryButton>

          <SecondaryButton onPress={navigateToWeather}>
            <SecondaryButtonText>Weather Forecast</SecondaryButtonText>
          </SecondaryButton>

          <SecondaryButton
            onPress={() => Alert.alert('Feature', 'Coming soon!')}
          >
            <SecondaryButtonText>
              Smart Home Controls
            </SecondaryButtonText>
          </SecondaryButton>

          <SecondaryButton
            onPress={() => Alert.alert('Feature', 'Coming soon!')}
          >
            <SecondaryButtonText>
              Energy Monitoring
            </SecondaryButtonText>
          </SecondaryButton>
        </ActionsContainer>

        <FooterContainer>
          <LogoutButton onPress={handleLogout}>
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>
        </FooterContainer>
      </ContentContainer>
    </SafeContainer>
  );
}

