import React from 'react';
import { render, renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext, { useAuth } from '../auth/AuthContext';
import AuthProvider from '../auth/AuthProvider';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });

  test('should work when useAuth is used within AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    // Should not throw and should have the expected properties
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('signup');
  });

  test('should provide auth context values when used within AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('signup');
  });

  test('should initialize with unauthenticated state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  test('should restore auth state from AsyncStorage', async () => {
    // Setup AsyncStorage with existing auth data
    const userData = { email: 'test@example.com', name: 'test' };
    await AsyncStorage.setItem('auth_token', 'mock_token');
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(userData);
  });

  test('should login successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const email = 'test@example.com';
    const password = 'password123';

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login(email, password);
    });

    expect(loginResult.success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      email,
      name: email.split('@')[0],
    });

    // Verify AsyncStorage was updated
    const storedToken = await AsyncStorage.getItem('auth_token');
    const storedUserData = await AsyncStorage.getItem('user_data');
    expect(storedToken).toBeTruthy();
    expect(JSON.parse(storedUserData)).toEqual({
      email,
      name: email.split('@')[0],
    });
  });

  test('should signup successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const email = 'newuser@example.com';
    const password = 'password123';
    const name = 'New User';

    let signupResult;
    await act(async () => {
      signupResult = await result.current.signup(email, password, name);
    });

    expect(signupResult.success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ email, name });

    // Verify AsyncStorage was updated
    const storedToken = await AsyncStorage.getItem('auth_token');
    const storedUserData = await AsyncStorage.getItem('user_data');
    expect(storedToken).toBeTruthy();
    expect(JSON.parse(storedUserData)).toEqual({ email, name });
  });

  test('should logout successfully', async () => {
    // Setup authenticated state
    const userData = { email: 'test@example.com', name: 'test' };
    await AsyncStorage.setItem('auth_token', 'mock_token');
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);

    // Verify AsyncStorage was cleared
    const storedToken = await AsyncStorage.getItem('auth_token');
    const storedUserData = await AsyncStorage.getItem('user_data');
    expect(storedToken).toBe(null);
    expect(storedUserData).toBe(null);
  });

  test('should handle AsyncStorage errors gracefully', async () => {
    // Mock AsyncStorage to throw error
    const originalGetItem = AsyncStorage.getItem;
    AsyncStorage.getItem = jest.fn().mockRejectedValue(new Error('Storage error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(consoleSpy).toHaveBeenCalledWith('Error checking auth state:', expect.any(Error));

    // Restore mocks
    AsyncStorage.getItem = originalGetItem;
    consoleSpy.mockRestore();
  });
});