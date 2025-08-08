import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import {
  SafeContainer,
  HeaderContainer,
  HeaderTitle,
  HeaderButton,
  HeaderButtonText,
  ContentContainer,
  Card,
  Title,
  BodyText,
  LoadingContainer,
  LoadingText,
} from '../theme/components';
import { theme } from '../theme';

// Garden map styled components
const GardenGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${theme.spacing.lg}px;
`;

const PlantTile = styled.TouchableOpacity`
  width: 30%;
  aspect-ratio: 1;
  margin-bottom: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${props => props.borderColor || theme.colors.border.light};
  background-color: ${props => props.backgroundColor || theme.colors.background.card};
`;

const PlantName = styled.Text`
  font-size: ${theme.typography.sizes.sm}px;
  font-weight: ${theme.typography.weights.semiBold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const PlantVariety = styled.Text`
  font-size: ${theme.typography.sizes.xs}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const HealthIndicator = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.color};
`;

const LegendContainer = styled.View`
  margin-top: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const LegendRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const LegendDot = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.color};
  margin-right: ${theme.spacing.sm}px;
`;

const LegendText = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.primary};
`;

// Mock garden data with plants and their SMD (Soil Moisture Density) values
const mockGardenData = [
  { id: 1, name: 'Tomato', variety: 'Cherry', smd: 85, type: 'vegetable' },
  { id: 2, name: 'Carrot', variety: 'Orange', smd: 45, type: 'vegetable' },
  { id: 3, name: 'Apple', variety: 'Gala', smd: 75, type: 'fruit' },
  { id: 4, name: 'Lettuce', variety: 'Romaine', smd: 90, type: 'vegetable' },
  { id: 5, name: 'Strawberry', variety: 'June', smd: 25, type: 'fruit' },
  { id: 6, name: 'Pepper', variety: 'Bell', smd: 70, type: 'vegetable' },
  { id: 7, name: 'Basil', variety: 'Sweet', smd: 80, type: 'herb' },
  { id: 8, name: 'Cucumber', variety: 'English', smd: 35, type: 'vegetable' },
  { id: 9, name: 'Spinach', variety: 'Baby', smd: 88, type: 'vegetable' },
];

// Helper function to get health color based on SMD value
const getHealthColor = (smd) => {
  if (smd >= 70) return theme.colors.status.success; // Healthy (green)
  if (smd >= 40) return theme.colors.status.warning; // Warning (yellow/orange)
  return theme.colors.status.error; // Unhealthy (red)
};

// Helper function to get health status text
const getHealthStatus = (smd) => {
  if (smd >= 70) return 'Healthy';
  if (smd >= 40) return 'Needs Water';
  return 'Critical';
};

export default function GardenMapScreen({ navigation }) {
  const [gardenData, setGardenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading garden data
    const loadGardenData = () => {
      setTimeout(() => {
        setGardenData(mockGardenData);
        setIsLoading(false);
      }, 1000);
    };

    loadGardenData();
  }, []);

  const handlePlantPress = (plant) => {
    Alert.alert(
      `${plant.name} (${plant.variety})`,
      `Type: ${plant.type}\nSoil Moisture: ${plant.smd}%\nStatus: ${getHealthStatus(plant.smd)}`,
      [{ text: 'OK' }]
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <SafeContainer>
        <HeaderContainer>
          <HeaderButton onPress={goBack}>
            <HeaderButtonText>← Back</HeaderButtonText>
          </HeaderButton>
          <HeaderTitle>Garden Map</HeaderTitle>
          <HeaderButton />
        </HeaderContainer>
        <LoadingContainer>
          <LoadingText>Loading your garden...</LoadingText>
        </LoadingContainer>
      </SafeContainer>
    );
  }

  return (
    <SafeContainer>
      <HeaderContainer>
        <HeaderButton onPress={goBack}>
          <HeaderButtonText>← Back</HeaderButtonText>
        </HeaderButton>
        <HeaderTitle>Garden Map</HeaderTitle>
        <HeaderButton />
      </HeaderContainer>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContentContainer>
          <Card shadow>
            <Title>Your Garden Overview</Title>
            <BodyText>
              Monitor your plants' health based on soil moisture density (SMD). 
              Tap any plant for detailed information.
            </BodyText>
          </Card>

          <LegendContainer>
            <LegendRow>
              <LegendDot color={theme.colors.status.success} />
              <LegendText>Healthy (SMD ≥ 70%)</LegendText>
            </LegendRow>
            <LegendRow>
              <LegendDot color={theme.colors.status.warning} />
              <LegendText>Needs Water (SMD 40-69%)</LegendText>
            </LegendRow>
            <LegendRow>
              <LegendDot color={theme.colors.status.error} />
              <LegendText>Critical (SMD &lt; 40%)</LegendText>
            </LegendRow>
          </LegendContainer>

          <GardenGrid>
            {gardenData.map((plant) => (
              <PlantTile
                key={plant.id}
                onPress={() => handlePlantPress(plant)}
                borderColor={getHealthColor(plant.smd)}
                backgroundColor={theme.colors.background.card}
              >
                <PlantName>{plant.name}</PlantName>
                <PlantVariety>{plant.variety}</PlantVariety>
                <HealthIndicator color={getHealthColor(plant.smd)} />
              </PlantTile>
            ))}
          </GardenGrid>
        </ContentContainer>
      </ScrollView>
    </SafeContainer>
  );
}