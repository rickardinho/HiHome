# HiHome - React Native Expo App

A React Native Expo application with authentication, navigation, and location awareness.

## Features

- **Authentication**: Context-based authentication with login and signup
- **Navigation**: React Navigation with stack navigation
- **Location Services**: Expo Location API integration with permissions
- **Scalable Architecture**: Well-organized folder structure following best practices

## Project Structure

```
├── App.js                     # Root entry point (imports from src/App.js)
├── src/
│   ├── App.js                 # Main app component with navigation
│   ├── auth/
│   │   ├── AuthContext.js     # Authentication context
│   │   └── AuthProvider.js    # Authentication provider with AsyncStorage
│   ├── screens/
│   │   ├── LoginScreen.js     # Login screen
│   │   ├── SignupScreen.js    # Signup screen
│   │   ├── HomeScreen.js      # Protected home screen
│   │   └── LocationScreen.js  # Location display screen
│   └── utils/
│       └── location.js        # Location permission and helper functions
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
└── babel.config.js            # Babel configuration
```

## Dependencies

- **expo**: Core Expo SDK
- **react-navigation**: Navigation library
- **expo-location**: Location services
- **@react-native-async-storage/async-storage**: Local storage
- **react-native-gesture-handler**: Gesture handling
- **react-native-screens**: Native screen management
- **react-native-safe-area-context**: Safe area support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
# or
expo start
```

3. Run on specific platforms:
```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## Features Overview

### Authentication
- Login and signup screens with validation
- Context-based state management
- Persistent authentication using AsyncStorage
- Protected route handling

### Navigation
- Stack navigation for auth and app flows
- Conditional navigation based on authentication state
- Clean navigation between screens

### Location Services
- Location permission handling
- Current location retrieval with high accuracy
- Reverse geocoding for addresses
- Location watching capabilities

## Usage

1. **First Launch**: Users will see the login screen
2. **Signup**: New users can create an account
3. **Login**: Existing users can sign in
4. **Home Screen**: After authentication, users access the main app
5. **Location Screen**: Users can view their current location and address

## Development Notes

- All main source code is organized in the `src/` directory
- The root `App.js` simply imports and exports from `src/App.js`
- Authentication state is managed globally using React Context
- Location permissions are handled gracefully with user feedback
- The app follows React Native and Expo best practices

## Permissions

The app requires the following permissions:
- **Location**: For accessing device location (Android: ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION)

## Contributing

When adding new features:
1. Keep components in appropriate directories under `src/`
2. Update the navigation structure in `src/App.js` if needed
3. Add any new utilities to `src/utils/`
4. Follow the existing code style and patterns