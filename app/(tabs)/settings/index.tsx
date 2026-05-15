import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import {
  useTheme,
  Text,
  Card,
  Avatar,
  List,
  Switch,
  Divider,
  Button,
} from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import { useOverlay } from "../../../contexts/overlayContext";
import ScrollTop from "../../../components/scrollTop";

export default function Settings() {
  const theme = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const { toast } = useOverlay();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing["3xl"],
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          mode="elevated"
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: tokens.radii.xl,
          }}
        >
          <Card.Content
            style={{
              padding: tokens.spacing.xl,
              alignItems: "center",
              gap: tokens.spacing.sm,
            }}
          >
            <Avatar.Image
              size={80}
              source={{ uri: "https://picsum.photos/seed/agent/200" }}
            />
            <View style={{ alignItems: "center" }}>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Agent Smith
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Senior Customer Support
              </Text>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.primary, marginTop: 4 }}
              >
                Emp ID: #CS-9842
              </Text>
            </View>
            <Button
              mode="outlined"
              onPress={() => toast("Profile editing coming soon")}
              style={{
                marginTop: tokens.spacing.sm,
                borderRadius: tokens.radii.pill,
              }}
              compact
            >
              Edit Profile
            </Button>
          </Card.Content>
        </Card>

        {/* Preferences Section */}
        <View style={{ gap: tokens.spacing.md }}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginLeft: 4 }}
          >
            App Preferences
          </Text>

          <Card
            mode="contained"
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: tokens.radii.lg,
            }}
          >
            <List.Item
              title="Language"
              description="English (US)"
              left={(props) => <List.Icon {...props} icon="translate" />}
              onPress={() => toast("Language settings")}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card>
        </View>

        {/* Support Section */}
        <View style={{ gap: tokens.spacing.md }}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginLeft: 4 }}
          >
            Support
          </Text>

          <Card
            mode="contained"
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: tokens.radii.lg,
            }}
          >
            <List.Item
              title="Help Center"
              left={(props) => (
                <List.Icon {...props} icon="help-circle-outline" />
              )}
              onPress={() => toast("Opening Help Center")}
              right={(props) => <List.Icon {...props} icon="open-in-new" />}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              left={(props) => (
                <List.Icon {...props} icon="shield-check-outline" />
              )}
              onPress={() => toast("Viewing Privacy Policy")}
            />
          </Card>
        </View>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
