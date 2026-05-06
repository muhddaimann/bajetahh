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
  buttonText?: string;
  onClose: () => void;
};

export function OverlayAlert({
  visible,
  title,
  message,
  buttonText = "Got it",
  onClose,
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

  const hide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      onClose();
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
        <TouchableWithoutFeedback onPress={hide}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: theme.colors.backdrop,
              justifyContent: "center",
              alignItems: "center",
              padding: tokens.spacing.xl,
              opacity: backdropOpacity,
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                renderToHardwareTextureAndroid
                style={{
                  width: "100%",
                  maxWidth: 320,
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
                        backgroundColor: theme.colors.primaryContainer,
                      }}
                    >
                      <Icon
                        source="bell-outline"
                        size={32}
                        color={theme.colors.primary}
                      />
                    </View>
                  </View>

                  <View
                    style={{
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

                  <Button
                    mode="contained"
                    onPress={hide}
                    style={{
                      width: "100%",
                      borderRadius: tokens.radii.pill,
                    }}
                    contentStyle={{
                      paddingVertical: tokens.spacing.xs,
                    }}
                  >
                    {buttonText}
                  </Button>
                </Surface>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Portal>
  );
}
