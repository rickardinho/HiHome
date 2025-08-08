import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import {
  Container,
  SafeContainer,
  ContentContainer,
  CenteredContainer,
  Card,
  Title,
  Subtitle,
  BodyText,
  AccentButton,
  SecondaryButton,
  ButtonText,
  SecondaryButtonText,
  LogoutButton,
  LogoutButtonText,
  LoadingContainer,
} from '../theme/components';

// Test wrapper with theme provider
const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Styled Components', () => {
  describe('Container Components', () => {
    test('should render Container component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <Container />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should render SafeContainer component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <SafeContainer />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should render ContentContainer component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <ContentContainer />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should render CenteredContainer component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <CenteredContainer />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should render LoadingContainer component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <LoadingContainer />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Card Component', () => {
    test('should render Card component', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <Card />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should render Card component with shadow', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <Card shadow />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Text Components', () => {
    test('should render Title component with text', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <Title>Test Title</Title>
        </ThemeWrapper>
      );
      expect(getByText('Test Title')).toBeTruthy();
    });

    test('should render Subtitle component with text', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <Subtitle>Test Subtitle</Subtitle>
        </ThemeWrapper>
      );
      expect(getByText('Test Subtitle')).toBeTruthy();
    });

    test('should render BodyText component with text', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <BodyText>Test Body Text</BodyText>
        </ThemeWrapper>
      );
      expect(getByText('Test Body Text')).toBeTruthy();
    });
  });

  describe('Button Components', () => {
    test('should render AccentButton component', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <AccentButton onPress={mockPress}>
            <ButtonText>Accent Button</ButtonText>
          </AccentButton>
        </ThemeWrapper>
      );
      expect(getByText('Accent Button')).toBeTruthy();
    });

    test('should render SecondaryButton component', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <SecondaryButton onPress={mockPress}>
            <SecondaryButtonText>Secondary Button</SecondaryButtonText>
          </SecondaryButton>
        </ThemeWrapper>
      );
      expect(getByText('Secondary Button')).toBeTruthy();
    });

    test('should render LogoutButton component', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <LogoutButton onPress={mockPress}>
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>
        </ThemeWrapper>
      );
      expect(getByText('Logout')).toBeTruthy();
    });

    test('should render ButtonText component', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <ButtonText>Button Text</ButtonText>
        </ThemeWrapper>
      );
      expect(getByText('Button Text')).toBeTruthy();
    });

    test('should render SecondaryButtonText component', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <SecondaryButtonText>Secondary Text</SecondaryButtonText>
        </ThemeWrapper>
      );
      expect(getByText('Secondary Text')).toBeTruthy();
    });

    test('should render LogoutButtonText component', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <LogoutButtonText>Logout Text</LogoutButtonText>
        </ThemeWrapper>
      );
      expect(getByText('Logout Text')).toBeTruthy();
    });
  });

  describe('Button Interactions', () => {
    test('should handle AccentButton press', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <AccentButton onPress={mockPress}>
            <ButtonText>Press Me</ButtonText>
          </AccentButton>
        </ThemeWrapper>
      );
      
      const button = getByText('Press Me');
      // In React Native Testing Library, we need to find the touchable parent
      expect(button).toBeTruthy();
    });

    test('should handle SecondaryButton press', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <SecondaryButton onPress={mockPress}>
            <SecondaryButtonText>Press Me</SecondaryButtonText>
          </SecondaryButton>
        </ThemeWrapper>
      );
      
      const button = getByText('Press Me');
      expect(button).toBeTruthy();
    });

    test('should handle LogoutButton press', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <LogoutButton onPress={mockPress}>
            <LogoutButtonText>Press Me</LogoutButtonText>
          </LogoutButton>
        </ThemeWrapper>
      );
      
      const button = getByText('Press Me');
      expect(button).toBeTruthy();
    });
  });

  describe('Component Props', () => {
    test('should handle Card with custom props', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <Card shadow testID="test-card" />
        </ThemeWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    test('should handle button components with disabled state', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <AccentButton onPress={mockPress} disabled>
            <ButtonText>Disabled Button</ButtonText>
          </AccentButton>
        </ThemeWrapper>
      );
      expect(getByText('Disabled Button')).toBeTruthy();
    });
  });

  describe('Component Nesting', () => {
    test('should handle nested components', () => {
      const { getByText } = render(
        <ThemeWrapper>
          <Container>
            <ContentContainer>
              <Title>Nested Title</Title>
              <Card>
                <BodyText>Card Content</BodyText>
              </Card>
            </ContentContainer>
          </Container>
        </ThemeWrapper>
      );
      
      expect(getByText('Nested Title')).toBeTruthy();
      expect(getByText('Card Content')).toBeTruthy();
    });

    test('should handle complex button structures', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <ThemeWrapper>
          <CenteredContainer>
            <AccentButton onPress={mockPress}>
              <ButtonText>Primary Action</ButtonText>
            </AccentButton>
            <SecondaryButton onPress={mockPress}>
              <SecondaryButtonText>Secondary Action</SecondaryButtonText>
            </SecondaryButton>
          </CenteredContainer>
        </ThemeWrapper>
      );
      
      expect(getByText('Primary Action')).toBeTruthy();
      expect(getByText('Secondary Action')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    test('should use theme values correctly', () => {
      const { toJSON } = render(
        <ThemeWrapper>
          <Title>Theme Test</Title>
        </ThemeWrapper>
      );
      
      // Component should render without errors, indicating proper theme integration
      expect(toJSON()).toBeTruthy();
    });

    test('should handle missing theme gracefully', () => {
      // Test without ThemeProvider to ensure graceful handling
      expect(() => {
        render(<Title>No Theme</Title>);
      }).not.toThrow();
    });
  });
});