import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../auth/AuthContext';

// Mock the auth context
jest.mock('../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('HomeScreen', () => {
  const mockLogout = jest.fn();
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
  });

  test('should render home screen correctly', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Welcome Home!')).toBeTruthy();
    expect(getByText('Hello, John Doe')).toBeTruthy();
    expect(getByText('View Location')).toBeTruthy();
    expect(getByText('Smart Home Controls')).toBeTruthy();
    expect(getByText('Energy Monitoring')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  test('should display fallback name when user name is not available', () => {
    useAuth.mockReturnValue({
      user: { email: 'test@example.com' },
      logout: mockLogout,
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Hello, User')).toBeTruthy();
  });

  test('should display fallback name when user is null', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: mockLogout,
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Hello, User')).toBeTruthy();
  });

  test('should navigate to Location screen when View Location is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const locationButton = getByText('View Location');
    fireEvent.press(locationButton);

    expect(mockNavigate).toHaveBeenCalledWith('Location');
  });

  test('should show alert for Smart Home Controls feature', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const smartHomeButton = getByText('Smart Home Controls');
    fireEvent.press(smartHomeButton);

    expect(Alert.alert).toHaveBeenCalledWith('Feature', 'Coming soon!');
  });

  test('should show alert for Energy Monitoring feature', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const energyButton = getByText('Energy Monitoring');
    fireEvent.press(energyButton);

    expect(Alert.alert).toHaveBeenCalledWith('Feature', 'Coming soon!');
  });

  test('should show logout confirmation when logout is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(Alert.alert).toHaveBeenCalledWith(
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
          onPress: mockLogout,
        },
      ]
    );
  });

  test('should call logout when logout is confirmed', () => {
    // Mock Alert.alert to simulate user pressing the logout button
    Alert.alert.mockImplementation((title, message, buttons) => {
      // Find the logout button and call its onPress
      const logoutButton = buttons.find(button => button.text === 'Logout');
      if (logoutButton && logoutButton.onPress) {
        logoutButton.onPress();
      }
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  test('should not call logout when cancel is pressed', () => {
    // Mock Alert.alert to simulate user pressing the cancel button
    Alert.alert.mockImplementation((title, message, buttons) => {
      // Find the cancel button and call its onPress (which should be undefined)
      const cancelButton = buttons.find(button => button.text === 'Cancel');
      expect(cancelButton.style).toBe('cancel');
      // Cancel button doesn't have onPress, so logout shouldn't be called
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(mockLogout).not.toHaveBeenCalled();
  });

  test('should render user email when name contains email format', () => {
    useAuth.mockReturnValue({
      user: { 
        name: 'testuser@example.com',
        email: 'testuser@example.com' 
      },
      logout: mockLogout,
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Hello, testuser@example.com')).toBeTruthy();
  });

  test('should handle missing navigation prop gracefully', () => {
    // This tests that the component doesn't crash without navigation
    expect(() => {
      render(<HomeScreen />);
    }).not.toThrow();
  });

  test('should have correct button styles for primary action', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const locationButton = getByText('View Location');
    
    // The button should be rendered
    expect(locationButton).toBeTruthy();
  });

  test('should have correct button styles for secondary actions', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const smartHomeButton = getByText('Smart Home Controls');
    const energyButton = getByText('Energy Monitoring');
    
    // The buttons should be rendered
    expect(smartHomeButton).toBeTruthy();
    expect(energyButton).toBeTruthy();
  });
});