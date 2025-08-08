# HiHome - React Native Expo App

HiHome is a React Native Expo application featuring authentication, navigation, and location services. It targets mobile platforms (iOS and Android) with experimental web support.

**ALWAYS follow these instructions first and fallback to search or additional context gathering only when the information here is incomplete or found to be in error.**

## Working Effectively

### Initial Setup and Dependencies
- **Install dependencies**: `npm install`
  - Takes approximately 2-3 minutes to complete
  - NEVER CANCEL: Wait for full completion even if it appears to hang
  - Set timeout to 5+ minutes for this command
  - Warnings about deprecated packages are normal and expected

### Known Limitations and Workarounds
- **Expo CLI Issue**: Development server (`expo start`, `npm start`) fails in CI environments due to TypeScript prerequisite checking bug
  - Error: "TypeError: g.on is not a function" in glob utility
  - **DO NOT** create a tsconfig.json file - this is a JavaScript project
  - **Workaround**: Use Metro bundler directly for code validation: `npx metro build App.js --platform android --out /tmp/bundle.js --dev`

### Build and Bundle Validation
- **Metro bundler works directly**: 
  - `npx metro build App.js --platform android --out /tmp/bundle.js --dev` - Takes 2-3 minutes
  - `npx metro build App.js --platform ios --out /tmp/bundle.js --dev` - Takes 2-3 minutes
  - NEVER CANCEL: Set timeout to 5+ minutes for build commands
- **Web platform has limitations**: React Navigation assets don't resolve properly for web (expected behavior)
- **Development server**: Cannot be reliably started in CI environments due to Expo CLI bugs

### Testing and Validation
- **No test suite**: This project does not include automated tests
- **No linting**: This project does not include ESLint or other linting tools
- **Manual validation required**: Test app functionality through manual scenarios

## Project Structure and Navigation

### Key Directories
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

### Important Files to Check After Changes
- Always verify `src/App.js` after modifying navigation or authentication flows
- Check `src/auth/AuthProvider.js` after changing authentication logic
- Review `src/utils/location.js` after modifying location-related functionality
- Verify `app.json` for Expo configuration changes

## Validation Scenarios

### Critical User Scenarios to Test
Since the development server cannot be reliably started, focus on code validation through:

1. **Authentication Flow Validation**:
   - Verify login/signup screen components render correctly
   - Check AsyncStorage integration in AuthProvider.js
   - Ensure navigation between auth and app screens works

2. **Location Services Validation**:
   - Review permission handling in `src/utils/location.js`
   - Check LocationScreen.js implementation
   - Verify Expo Location API integration

3. **Navigation Structure Validation**:
   - Confirm stack navigation setup in `src/App.js`
   - Test conditional navigation based on authentication state
   - Ensure proper screen imports and exports

### Code Validation Commands
```bash
# Validate JavaScript syntax and imports for Android
npx metro build App.js --platform android --out /tmp/bundle.js --dev

# Validate JavaScript syntax and imports for iOS  
npx metro build App.js --platform ios --out /tmp/bundle.js --dev

# Expected behavior:
# - Takes 2-3 minutes to complete
# - NEVER CANCEL - set 5+ minute timeout
# - Processes ~500 modules successfully (reaching ~20-23% completion)
# - Fails with React Navigation asset resolution error (EXPECTED)
# - Error: "Unable to resolve module missing-asset-registry-path" (NORMAL)

# Success indicators:
# - Bundle process starts and shows Metro welcome screen
# - Progress reaches at least 20% before failing
# - No syntax errors or missing imports in your code

# Failure indicators requiring action:
# - Immediate failure (0% progress)
# - Module resolution errors for your source files
# - Syntax errors in your code
```

## Dependencies and Requirements

### Core Dependencies
- **expo**: ~49.0.15 (Core Expo SDK)
- **react**: 18.2.0
- **react-native**: 0.72.6
- **@react-navigation/native**: ^6.1.7 (Navigation)
- **@react-navigation/stack**: ^6.3.17 (Stack navigation)
- **expo-location**: ~16.1.0 (Location services)
- **@react-native-async-storage/async-storage**: 1.18.2 (Local storage)

### Web Dependencies (Optional)
If web support is needed:
```bash
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config
```
Note: Web platform has known asset resolution issues with React Navigation.

## Common Tasks

### Repository Structure Reference
```bash
# ls -la /
App.js
README.md
app.json
assets/
babel.config.js
package-lock.json
package.json
src/
```

### package.json Scripts
```json
{
  "start": "expo start",
  "android": "expo start --android", 
  "ios": "expo start --ios",
  "web": "expo start --web"
}
```

**Note**: All start scripts currently fail in CI environments due to Expo CLI bugs.

## Troubleshooting

### Common Issues
1. **"g.on is not a function" error**: Known Expo CLI bug in CI environments - use Metro bundler directly
2. **Web asset resolution failures**: Expected for React Navigation on web platform
3. **Permission errors with location**: Check `app.json` for proper Android permissions configuration
4. **Build hangs**: Normal for Metro bundler - always wait for completion (2-5 minutes)

### When Making Changes
- Always run bundle validation after code changes
- Check imports and exports carefully
- Verify navigation structure remains intact
- Test authentication flow logic manually
- Review location permission handling

### Emergency Workarounds
- If Expo commands fail completely, validate code through direct file inspection
- Use Metro bundler for syntax validation instead of development server
- Check React Native community docs for version-specific issues

## Features Overview
- **Authentication**: Context-based with AsyncStorage persistence
- **Navigation**: Stack navigation with conditional routing
- **Location Services**: Expo Location with permission handling
- **Cross-platform**: iOS, Android, and experimental web support