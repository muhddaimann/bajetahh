import React, { useEffect, useRef } from "react";
import { View, TouchableWithoutFeedback, Animated } from "react-native";
import {
  Surface,
  Text,
  Button,
  useTheme,
  Portal,
  Icon,
} from "react-native-paper";
import { useDesign } from "../contexts/designContext";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
};

export function OverlayConfirm({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: Props) {
  const theme = useTheme();
  const tokens = useDesign();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 7,
      }).start();
    }
  }, [visible]);

  const hide = (callback: () => void) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      callback();
    });
  };

  if (!visible) return null;

  const backdropOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const contentScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const contentTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <Portal>
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <TouchableWithoutFeedback onPress={() => hide(onCancel)}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: tokens.spacing.xl,
              backgroundColor: theme.colors.backdrop,
              opacity: backdropOpacity,
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                renderToHardwareTextureAndroid
                style={{
                  width: "100%",
                  maxWidth: 340,
                  opacity: animatedValue,
                  transform: [
                    { scale: contentScale },
                    { translateY: contentTranslateY },
                  ],
                }}
              >
                <Surface
                  elevation={5}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: theme.colors.surface,
                    borderRadius: tokens.radii["2xl"],
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                  }}
                >
                  <View
                    style={{
                      marginBottom: tokens.spacing.xs,
                    }}
                  >
                    <View
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: isDestructive
                          ? theme.colors.errorContainer
                          : theme.colors.secondaryContainer,
                      }}
                    >
                      <Icon
                        source={
                          isDestructive
                            ? "alert-outline"
                            : "help-circle-outline"
                        }
                        size={32}
                        color={
                          isDestructive
                            ? theme.colors.error
                            : theme.colors.secondary
                        }
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      gap: tokens.spacing.sm,
                    }}
                  >
                    {title && (
                      <Text
                        variant="headlineSmall"
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: theme.colors.onSurface,
                        }}
                      >
                        {title}
                      </Text>
                    )}

                    {message && (
                      <Text
                        variant="bodyMedium"
                        style={{
                          textAlign: "center",
                          lineHeight: 22,
                          color: theme.colors.onSurfaceVariant,
                        }}
                      >
                        {message}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      width: "100%",
                      gap: tokens.spacing.xs,
                    }}
                  >
                    <Button
                      mode="contained"
                      onPress={() => hide(onConfirm)}
                      buttonColor={
                        isDestructive
                          ? theme.colors.error
                          : theme.colors.primary
                      }
                      textColor={
                        isDestructive
                          ? theme.colors.onError
                          : theme.colors.onPrimary
                      }
                      style={{
                        width: "100%",
                        borderRadius: tokens.radii.pill,
                      }}
                      contentStyle={{
                        paddingVertical: tokens.spacing.xs,
                      }}
                    >
                      {confirmText}
                    </Button>

                    <Button
                      mode="text"
                      onPress={() => hide(onCancel)}
                      textColor={theme.colors.onSurfaceVariant}
                      style={{
                        width: "100%",
                        borderRadius: tokens.radii.pill,
                      }}
                      contentStyle={{
                        paddingVertical: tokens.spacing.xs,
                      }}
                    >
                      {cancelText}
                    </Button>
                  </View>
                </Surface>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Portal>
  );
}
