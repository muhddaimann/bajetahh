import React, { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput as RNTextInput,
} from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useDesign } from "../contexts/designContext";
import { useAuth } from "../contexts/authContext";
import { DUMMY_STAFF, DUMMY_MANAGER } from "../constants/user";

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
          width: 320,
          height: 320,
          borderRadius: 999,
          backgroundColor: theme.colors.primary,
          top: 120,
          left: -140,
          opacity: 0.9,
        }}
      />

      <View
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: 999,
          backgroundColor: theme.colors.secondary,
          bottom: 140,
          right: -120,
          opacity: 0.8,
        }}
      />

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
                gap: tokens.spacing.md,
              }}
            >
              <Image
                source={require("../assets/img/logo.png")}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
              />

              <View
                style={{
                  alignItems: "center",
                  gap: tokens.spacing.xs,
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{
                    fontWeight: "800",
                    textAlign: "center",
                    letterSpacing: -0.5,
                  }}
                >
                  Sign In
                </Text>

                <Text
                  variant="bodySmall"
                  style={{
                    textAlign: "center",
                    color: theme.colors.onSurfaceVariant,
                  }}
                >
                  Enter credentials or select a role to auto-fill
                </Text>
              </View>
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
              Authenticate to FAITH
            </Button>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                Reach system admin if you need help signing in.
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
                onPress={() => handleQuickSelect(DUMMY_STAFF.username, "123")}
                style={{
                  flex: 1,
                  borderRadius: tokens.radii.lg,
                  borderColor: theme.colors.outline,
                }}
                contentStyle={{
                  height: 64,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    variant="labelLarge"
                    style={{ fontWeight: "700", color: theme.colors.primary }}
                  >
                    Staff
                  </Text>
                </View>
              </Button>

              <Button
                mode="outlined"
                onPress={() => handleQuickSelect(DUMMY_MANAGER.username, "456")}
                style={{
                  flex: 1,
                  borderRadius: tokens.radii.lg,
                  borderColor: theme.colors.outline,
                }}
                contentStyle={{
                  height: 64,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    variant="labelLarge"
                    style={{ fontWeight: "700", color: theme.colors.secondary }}
                  >
                    Manager
                  </Text>
                </View>
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
