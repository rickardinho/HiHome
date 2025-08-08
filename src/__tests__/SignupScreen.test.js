import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SignupScreen from '../screens/SignupScreen';
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

describe('SignupScreen', () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      signup: mockSignup,
    });
  });

  test('should render signup form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    expect(getByText('Join HiHome')).toBeTruthy();
    expect(getByText('Create your account')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Sign in')).toBeTruthy();
  });

  test('should show alert when fields are empty', () => {
    const { getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const signupButton = getByText('Sign Up');
    fireEvent.press(signupButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
    expect(mockSignup).not.toHaveBeenCalled();
  });

  test('should show alert when passwords do not match', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'differentpassword');
    fireEvent.press(signupButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match');
    expect(mockSignup).not.toHaveBeenCalled();
  });

  test('should show alert when password is too short', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.changeText(confirmPasswordInput, '123');
    fireEvent.press(signupButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Password must be at least 6 characters');
    expect(mockSignup).not.toHaveBeenCalled();
  });

  test('should call signup with correct data when form is valid', async () => {
    mockSignup.mockResolvedValue({ success: true });

    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
    });
  });

  test('should show loading state during signup', async () => {
    const signupPromise = new Promise(resolve => {
      setTimeout(() => resolve({ success: true }), 100);
    });
    mockSignup.mockReturnValue(signupPromise);

    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(signupButton);

    // Check that loading state is shown
    expect(getByText('Creating Account...')).toBeTruthy();

    // Wait for signup to complete
    await waitFor(() => {
      expect(getByText('Sign Up')).toBeTruthy();
    });
  });

  test('should show alert when signup fails', async () => {
    mockSignup.mockResolvedValue({ 
      success: false, 
      error: 'Email already exists' 
    });

    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Signup Failed', 'Email already exists');
    });
  });

  test('should navigate to login when login link is pressed', () => {
    const { getByText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const loginLink = getByText('Already have an account? Sign in');
    fireEvent.press(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  test('should update form fields when typed', () => {
    const { getByPlaceholderText } = render(
      <SignupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(nameInput.props.value).toBe('John Doe');
    expect(emailInput.props.value).toBe('john@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmPasswordInput.props.value).toBe('password123');
  });
});