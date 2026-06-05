import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="order" options={{ title: "" }} />
      <Stack.Screen name="admin" options={{ title: "" }} />
      <Stack.Screen name="main" options={{ title: "" }} />
    </Stack>
  );
}
