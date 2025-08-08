import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
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

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      login: mockLogin,
    });
  });

  test('should render login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    expect(getByText('Welcome to HiHome')).toBeTruthy();
    expect(getByText('Please sign in to continue')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText("Don't have an account? Sign up")).toBeTruthy();
  });

  test('should update email input when typed', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('should update password input when typed', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  test('should show alert when fields are empty and login is attempted', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const loginButton = getByText('Sign In');
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('should show alert when only email is provided', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const loginButton = getByText('Sign In');
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('should show alert when only password is provided', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');

    const loginButton = getByText('Sign In');
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('should call login with correct credentials when form is submitted', async () => {
    mockLogin.mockResolvedValue({ success: true });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('should show loading state during login', async () => {
    // Create a mock that we can control when it resolves
    const loginPromise = new Promise(resolve => {
      setTimeout(() => resolve({ success: true }), 100);
    });
    mockLogin.mockReturnValue(loginPromise);

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    // Check that loading state is shown
    expect(getByText('Signing In...')).toBeTruthy();

    // Wait for login to complete
    await waitFor(() => {
      expect(getByText('Sign In')).toBeTruthy();
    });
  });

  test('should show alert when login fails', async () => {
    mockLogin.mockResolvedValue({ 
      success: false, 
      error: 'Invalid credentials' 
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Invalid credentials');
    });
  });

  test('should navigate to signup when signup link is pressed', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const signupLink = getByText("Don't have an account? Sign up");
    fireEvent.press(signupLink);

    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });

  test('should have correct input props for email field', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    
    expect(emailInput.props.keyboardType).toBe('email-address');
    expect(emailInput.props.autoCapitalize).toBe('none');
    expect(emailInput.props.autoCorrect).toBe(false);
  });

  test('should have correct input props for password field', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const passwordInput = getByPlaceholderText('Password');
    
    expect(passwordInput.props.secureTextEntry).toBe(true);
    expect(passwordInput.props.autoCapitalize).toBe('none');
    expect(passwordInput.props.autoCorrect).toBe(false);
  });

  test('should disable login button during loading', async () => {
    const loginPromise = new Promise(resolve => {
      setTimeout(() => resolve({ success: true }), 100);
    });
    mockLogin.mockReturnValue(loginPromise);

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    // Check that button shows loading state
    expect(getByText('Signing In...')).toBeTruthy();

    // Wait for login to complete
    await waitFor(() => {
      expect(getByText('Sign In')).toBeTruthy();
    });
  });
});