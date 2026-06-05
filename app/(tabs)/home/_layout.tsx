import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="main" options={{ title: "" }} />
      <Stack.Screen name="order/index" options={{ title: "" }} />
      <Stack.Screen name="admin/index" options={{ title: "" }} />
      <Stack.Screen name="notification/index" options={{ title: "" }} />
      <Stack.Screen name="record" options={{ title: "" }} />
    </Stack>
  );
}
