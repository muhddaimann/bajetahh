import { Tabs } from "expo-router";
import { NavBar } from "../../components/navBar";
import { View, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { TabProvider } from "../../contexts/tabContext";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <TabProvider>
      <View
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "web"
              ? theme.colors.surfaceVariant
              : theme.colors.background,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 500,
            backgroundColor: theme.colors.background,
          }}
        >
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
              sceneStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: "Home",
              }}
            />

            <Tabs.Screen
              name="settings"
              options={{
                title: "Settings",
              }}
            />
          </Tabs>

          <NavBar />
        </View>
      </View>
    </TabProvider>
  );
}
