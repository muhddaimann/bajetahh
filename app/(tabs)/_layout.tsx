import { Tabs } from 'expo-router';
import { NavBar } from '../../components/navBar';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabProvider } from '../../contexts/tabContext';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <TabProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant, alignItems: 'center' }}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
              }}
            />
          </Tabs>
          <NavBar />
        </View>
      </View>
    </TabProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
  },
});
