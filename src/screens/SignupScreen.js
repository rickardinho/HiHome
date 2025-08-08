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

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const result = await signup(email, password, name);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Signup Failed', result.error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CenteredContainer>
          <Title>Join HiHome</Title>
          <Subtitle>Create your account</Subtitle>

          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />

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

          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <PrimaryButton
            onPress={handleSignup}
            disabled={isLoading}
          >
            <ButtonText>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </ButtonText>
          </PrimaryButton>

          <LinkButton onPress={navigateToLogin}>
            <LinkText>
              Already have an account? Sign in
            </LinkText>
          </LinkButton>
        </CenteredContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

