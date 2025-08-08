import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../auth/AuthContext';
import {
  Container,
  CenteredContainer,
  Title,
  Subtitle,
  Input,
  PrimaryButton,
  ButtonText,
  LinkButton,
  LinkText,
} from '../theme/components';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CenteredContainer>
          <Title>Welcome to HiHome</Title>
          <Subtitle>Please sign in to continue</Subtitle>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <PrimaryButton
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ButtonText>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </ButtonText>
          </PrimaryButton>

          <LinkButton onPress={navigateToSignup}>
            <LinkText>
              Don't have an account? Sign up
            </LinkText>
          </LinkButton>
        </CenteredContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

