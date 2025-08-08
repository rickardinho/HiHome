import styled from 'styled-components/native';
import { theme } from './index';

// Container components
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding-horizontal: ${theme.spacing.lg}px;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${theme.spacing.lg}px;
`;

// Card component
export const Card = styled.View`
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${props => props.shadow && `
    shadow-color: ${theme.colors.shadow.main};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 2;
  `}
`;

// Text components
export const Title = styled.Text`
  font-size: ${theme.typography.sizes.title}px;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const BodyText = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.primary};
  line-height: 24px;
`;

export const Label = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.weights.medium};
`;

export const ValueText = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.regular};
  text-align: right;
  flex: 1;
  margin-left: ${theme.spacing.sm}px;
`;

// Button components
export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary.main};
  padding-vertical: ${theme.spacing.md}px;
  padding-horizontal: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  align-items: center;
  shadow-color: ${theme.colors.shadow.main};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  ${props => props.disabled && `
    background-color: ${theme.colors.border.main};
  `}
`;

export const SecondaryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.background.card};
  border-width: 2px;
  border-color: ${theme.colors.primary.main};
  padding-vertical: ${theme.spacing.md}px;
  padding-horizontal: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  align-items: center;
  shadow-color: ${theme.colors.shadow.main};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const AccentButton = styled.TouchableOpacity`
  background-color: ${theme.colors.accent.main};
  padding-vertical: ${theme.spacing.lg}px;
  padding-horizontal: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.md}px;
  align-items: center;
  shadow-color: ${theme.colors.shadow.main};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.sizes.lg}px;
  font-weight: ${theme.typography.weights.semiBold};
`;

export const SecondaryButtonText = styled.Text`
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.sizes.lg}px;
  font-weight: ${theme.typography.weights.semiBold};
`;

export const LinkButton = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: ${theme.spacing.sm}px;
`;

export const LinkText = styled.Text`
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.sizes.md}px;
`;

// Input components
export const Input = styled.TextInput`
  background-color: ${theme.colors.background.card};
  padding-horizontal: ${theme.spacing.md}px;
  padding-vertical: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  font-size: ${theme.typography.sizes.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border.light};
  color: ${theme.colors.text.primary};
`;

// Layout components
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${theme.spacing.lg}px;
  padding-vertical: ${theme.spacing.md}px;
  background-color: ${theme.colors.background.card};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

export const HeaderTitle = styled.Text`
  font-size: ${theme.typography.sizes.xl}px;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
`;

export const HeaderButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
`;

export const HeaderButtonText = styled.Text`
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.sizes.md}px;
`;

// Loading components
export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${theme.spacing.xxl}px;
`;

export const LoadingText = styled.Text`
  margin-top: ${theme.spacing.sm}px;
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.text.secondary};
`;

// Error components
export const ErrorContainer = styled.View`
  align-items: center;
  padding-vertical: ${theme.spacing.xxl}px;
`;

export const ErrorText = styled.Text`
  font-size: ${theme.typography.sizes.md}px;
  color: ${theme.colors.status.error};
  text-align: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const ErrorButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary.main};
  padding-horizontal: ${theme.spacing.lg}px;
  padding-vertical: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm}px;
`;

export const ErrorButtonText = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.sizes.md}px;
  font-weight: ${theme.typography.weights.semiBold};
`;

// Logout button
export const LogoutButton = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: ${theme.spacing.md}px;
`;

export const LogoutButtonText = styled.Text`
  color: ${theme.colors.status.error};
  font-size: ${theme.typography.sizes.md}px;
  font-weight: ${theme.typography.weights.medium};
`;