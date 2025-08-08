import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import GardenMapScreen from '../screens/GardenMapScreen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack,
};

// Test wrapper with theme
const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('GardenMapScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const { getByText } = render(
      <TestWrapper>
        <GardenMapScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    expect(getByText('Loading your garden...')).toBeTruthy();
    expect(getByText('Garden Map')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const { getByText } = render(
      <TestWrapper>
        <GardenMapScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    // Press back button
    fireEvent.press(getByText('← Back'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});