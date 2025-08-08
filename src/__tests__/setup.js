// Jest setup file for React Native and Expo testing

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 37.4219999,
        longitude: -122.0840575,
        accuracy: 5,
      },
      timestamp: Date.now(),
    })
  ),
  reverseGeocodeAsync: jest.fn(() =>
    Promise.resolve([
      {
        street: '1 Hacker Way',
        city: 'Menlo Park',
        region: 'CA',
        country: 'United States',
        postalCode: '94025',
        name: 'Facebook HQ',
      },
    ])
  ),
  watchPositionAsync: jest.fn(() => Promise.resolve({ remove: jest.fn() })),
  Accuracy: {
    High: 1,
    Balanced: 2,
    Low: 3,
  },
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
  NavigationContainer: ({ children }) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ component: Component }) => <Component />,
  }),
}));

// Mock Expo StatusBar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Create a more complete React Native mock
const mockComponent = (name) => {
  const Component = ({ children, ...props }) => {
    const React = require('react');
    return React.createElement(name, props, children);
  };
  Component.displayName = name;
  return Component;
};

// Mock react-native completely
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => style,
  },
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  TextInput: mockComponent('TextInput'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  SafeAreaView: mockComponent('SafeAreaView'),
  KeyboardAvoidingView: mockComponent('KeyboardAvoidingView'),
  ActivityIndicator: mockComponent('ActivityIndicator'),
  ScrollView: mockComponent('ScrollView'),
}));

// Global test timeout
jest.setTimeout(10000);