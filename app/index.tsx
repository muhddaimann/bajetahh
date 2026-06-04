import React, { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RNTextInput,
} from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../contexts/designContext";
import { useAuth } from "../contexts/authContext";
import {
  DUMMY_CUSTOMER,
  DUMMY_ADMIN,
  APP_INITIAL,
  APP_NAME,
  APP_TAGLINE,
  AUTH_BUTTON_TEXT,
} from "../constants/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<RNTextInput>(null);
  const theme = useTheme();
  const tokens = useDesign();
  const { signIn } = useAuth();

  const handleQuickSelect = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  const handleLogin = async () => {
    if (!username || !password || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await signIn(username.trim(), password);
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
          name="food"
          size={320}
          color={theme.colors.primary}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: -80,
          left: -100,
          opacity: 0.04,
          transform: [{ rotate: "-20deg" }],
        }}
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={400}
          color={theme.colors.secondary}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: tokens.spacing.xl,
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
                  width: 64,
                  height: 64,
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
                    fontSize: 28,
                    fontWeight: "900",
                  }}
                >
                  {APP_INITIAL}
                </Text>
              </View>

              <Text
                variant="headlineMedium"
                style={{
                  fontWeight: "900",
                  color: theme.colors.primary,
                  letterSpacing: -1.5,
                }}
              >
                {APP_NAME}
              </Text>

              <Text
                variant="bodySmall"
                style={{
                  textAlign: "center",
                  color: theme.colors.onSurfaceVariant,
                  marginTop: -tokens.spacing.xs,
                }}
              >
                {APP_TAGLINE}
              </Text>
            </View>

            <View
              style={{
                gap: tokens.spacing.sm,
              }}
            >
              <TextInput
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
                style={{
                  backgroundColor: theme.colors.surface,
                }}
                left={
                  <TextInput.Icon
                    icon="account-outline"
                    color={theme.colors.primary}
                  />
                }
              />

              <TextInput
                ref={passwordRef}
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                outlineStyle={{
                  borderRadius: tokens.radii.lg,
                  borderColor: theme.colors.outline,
                }}
                style={{
                  backgroundColor: theme.colors.surface,
                }}
                left={
                  <TextInput.Icon
                    icon="lock-outline"
                    color={theme.colors.primary}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    color={theme.colors.onSurfaceVariant}
                  />
                }
              />
            </View>

            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={!username || !password || isSubmitting}
              contentStyle={{
                height: 56,
              }}
              style={{
                borderRadius: tokens.radii.lg,
                elevation: 2,
              }}
              labelStyle={{
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              {AUTH_BUTTON_TEXT}
            </Button>

            <View
              style={{
                alignItems: "center",
                marginTop: -tokens.spacing.sm,
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                Reach system admin if you need help.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: tokens.spacing.sm,
              }}
            >
              <Button
                mode="outlined"
                onPress={() => handleQuickSelect(DUMMY_CUSTOMER.username, "customer123")}
                style={{
                  flex: 1,
                  borderRadius: tokens.radii.lg,
                  borderColor: theme.colors.outline,
                }}
                contentStyle={{
                  height: 48,
                }}
              >
                <Text
                  variant="labelLarge"
                  style={{ fontWeight: "700", color: theme.colors.primary }}
                >
                  Customer
                </Text>
              </Button>

              <Button
                mode="outlined"
                onPress={() => handleQuickSelect(DUMMY_ADMIN.username, "admin123")}
                style={{
                  flex: 1,
                  borderRadius: tokens.radii.lg,
                  borderColor: theme.colors.outline,
                }}
                contentStyle={{
                  height: 48,
                }}
              >
                <Text
                  variant="labelLarge"
                  style={{ fontWeight: "700", color: theme.colors.secondary }}
                >
                  Admin
                </Text>
              </Button>
            </View>
          </View>
        </View>
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
