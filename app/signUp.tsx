import React, { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RNTextInput,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../contexts/designContext";
import { useOverlay } from "../contexts/overlayContext";
import { useRouter } from "expo-router";
import {
  APP_INITIAL,
  APP_NAME,
  APP_TAGLINE,
} from "../constants/user";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<RNTextInput>(null);
  const phoneRef = useRef<RNTextInput>(null);
  const usernameRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const theme = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { toast } = useOverlay();

  const handleSignUp = async () => {
    if (!name || !email || !username || !password || !confirmPassword || isSubmitting) return;

    if (password !== confirmPassword) {
      toast({ message: "Passwords do not match", variant: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ message: "Registration successful! Please login.", variant: "success" });
      router.replace("/");
    } catch (error) {
      toast({ message: "Registration failed. Please try again.", variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -40,
          right: -60,
          opacity: 0.04,
          transform: [{ rotate: "15deg" }],
        }}
      >
        <MaterialCommunityIcons
          name="account-plus"
          size={320}
          color={theme.colors.primary}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
        }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View
            style={{
              paddingHorizontal: tokens.spacing.xl,
              paddingVertical: tokens.spacing.xl,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: tokens.radii.xl,
                backgroundColor: theme.colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.lg,
                ...(Platform.OS === "web" && {
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                  shadowColor: theme.colors.shadow,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.08,
                  shadowRadius: 40,
                }),
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: tokens.spacing.xs,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radii.lg,
                    backgroundColor: theme.colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: tokens.spacing.xs,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.onPrimary,
                      fontSize: 24,
                      fontWeight: "900",
                    }}
                  >
                    {APP_INITIAL}
                  </Text>
                </View>

                <Text
                  variant="headlineSmall"
                  style={{
                    fontWeight: "900",
                    color: theme.colors.primary,
                    letterSpacing: -1,
                  }}
                >
                  Create Account
                </Text>

                <Text
                  variant="bodySmall"
                  style={{
                    textAlign: "center",
                    color: theme.colors.onSurfaceVariant,
                    marginTop: -tokens.spacing.xs,
                  }}
                >
                  Join {APP_NAME} and start ordering!
                </Text>
              </View>

              <View
                style={{
                  gap: tokens.spacing.sm,
                }}
              >
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="account-outline" color={theme.colors.primary} />}
                />

                <TextInput
                  ref={emailRef}
                  label="Email"
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="email-outline" color={theme.colors.primary} />}
                />

                <TextInput
                  ref={phoneRef}
                  label="Phone Number"
                  mode="outlined"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => usernameRef.current?.focus()}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="phone-outline" color={theme.colors.primary} />}
                />

                <TextInput
                  ref={usernameRef}
                  label="Username"
                  mode="outlined"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="account-circle-outline" color={theme.colors.primary} />}
                />

                <TextInput
                  ref={passwordRef}
                  label="Password"
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />

                <TextInput
                  ref={confirmPasswordRef}
                  label="Confirm Password"
                  mode="outlined"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSignUp}
                  outlineStyle={{
                    borderRadius: tokens.radii.lg,
                    borderColor: theme.colors.outline,
                  }}
                  style={{ backgroundColor: theme.colors.surface }}
                  left={<TextInput.Icon icon="lock-check-outline" color={theme.colors.primary} />}
                />
              </View>

              <Button
                mode="contained"
                onPress={handleSignUp}
                disabled={!name || !email || !username || !password || !confirmPassword || isSubmitting}
                loading={isSubmitting}
                contentStyle={{ height: 56 }}
                style={{ borderRadius: tokens.radii.lg }}
                labelStyle={{ fontWeight: "700", fontSize: 16 }}
              >
                Sign Up
              </Button>

              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text variant="bodyMedium">Already have an account? </Text>
                <Button 
                  mode="text" 
                  onPress={() => router.replace("/")}
                  labelStyle={{ fontWeight: "bold" }}
                  compact
                >
                  Login
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );

  if (Platform.OS === "web") {
    return renderContent();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {renderContent()}
    </TouchableWithoutFeedback>
  );
}
