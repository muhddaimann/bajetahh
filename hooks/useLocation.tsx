import React, { useState } from "react";
import { View, Pressable, ScrollView, Linking, Platform } from "react-native";
import { Text, Icon, useTheme, Divider, Button } from "react-native-paper";
import { useOverlay } from "../contexts/overlayContext";
import { useDesign } from "../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SAVED_LOCATIONS = [
  { id: "1", name: "Home", address: "No. 12, Jalan Kerinchi, Bangsar South", icon: "home" },
  { id: "2", name: "Office", address: "Menara TM, Jalan Pantai Baharu", icon: "briefcase" },
  { id: "3", name: "University", address: "Kolej Kediaman Pertama, UM", icon: "school" },
  { id: "4", name: "Gym", address: "Anytime Fitness, Nexus Bangsar South", icon: "dumbbell" },
];

const STALL_LOCATION = {
  name: "BajetAhh Stall, University Malaya",
  address: "Pusat Pelajar, University of Malaya, 50603 Kuala Lumpur",
  lat: 3.1209,
  lng: 101.6538,
};

export function useLocation() {
  const [userLocation, setUserLocation] = useState("");
  const { showSheet, hideSheet, toast } = useOverlay();
  const theme = useTheme();
  const tokens = useDesign();

  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${STALL_LOCATION.lat},${STALL_LOCATION.lng}`;
    const label = STALL_LOCATION.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url).catch(() => {
        toast({ message: "Unable to open maps", variant: "error" });
      });
    }
  };

  const LocationSheet = () => (
    <View style={{ gap: tokens.spacing.lg, paddingBottom: tokens.spacing.xl }}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text variant="titleLarge" style={{ fontWeight: "900" }}>Select Delivery Location</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Choose where you want your food delivered.</Text>
      </View>

      <ScrollView style={{ maxHeight: 400 }}>
        <View style={{ gap: tokens.spacing.sm }}>
          {SAVED_LOCATIONS.map((loc, index) => (
            <React.Fragment key={loc.id}>
              <Pressable
                onPress={() => {
                  setUserLocation(loc.address);
                  hideSheet();
                  toast({
                    message: `Delivery address set to ${loc.name}`,
                    variant: "success",
                  });
                }}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: tokens.spacing.md,
                  gap: tokens.spacing.md,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radii.lg,
                    backgroundColor: theme.colors.primary + "10",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon source={loc.icon} size={24} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "700" }}>{loc.name}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }} numberOfLines={1}>{loc.address}</Text>
                </View>
                <Icon source="chevron-right" size={20} color={theme.colors.onSurfaceVariant} />
              </Pressable>
              {index < SAVED_LOCATIONS.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          
          <Divider style={{ marginVertical: tokens.spacing.sm }} />
          
          <Pressable
            onPress={() => {
              hideSheet();
              toast("Map selection coming soon!");
            }}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: tokens.spacing.md,
              gap: tokens.spacing.md,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: tokens.radii.lg,
                backgroundColor: theme.colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon source="map-marker-plus" size={24} color={theme.colors.onSurfaceVariant} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="titleMedium" style={{ fontWeight: "700" }}>Add New Address</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );

  const PickupSheet = () => (
    <View style={{ gap: tokens.spacing.xl, paddingBottom: tokens.spacing.xl }}>
      <View style={{ gap: tokens.spacing.sm, alignItems: 'center' }}>
        <View 
          style={{ 
            width: 80, 
            height: 80, 
            borderRadius: tokens.radii.xl, 
            backgroundColor: theme.colors.primary + '15',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MaterialCommunityIcons name="storefront" size={44} color={theme.colors.primary} />
        </View>
        <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'center' }}>{STALL_LOCATION.name}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', paddingHorizontal: tokens.spacing.xl }}>
          {STALL_LOCATION.address}
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, padding: tokens.spacing.md, backgroundColor: theme.colors.surfaceVariant, borderRadius: tokens.radii.lg, gap: 4 }}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: '700' }}>OPENING HOURS</Text>
            <Text variant="titleSmall" style={{ fontWeight: '800' }}>8:00 AM - 6:00 PM</Text>
          </View>
          <View style={{ flex: 1, padding: tokens.spacing.md, backgroundColor: theme.colors.surfaceVariant, borderRadius: tokens.radii.lg, gap: 4 }}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: '700' }}>EST. READY TIME</Text>
            <Text variant="titleSmall" style={{ fontWeight: '800' }}>10 - 15 MINS</Text>
          </View>
        </View>

        <Button 
          mode="contained" 
          icon="map-marker"
          contentStyle={{ height: 56 }}
          style={{ borderRadius: tokens.radii.lg }}
          onPress={openMaps}
        >
          FIND US ON MAPS
        </Button>
      </View>
    </View>
  );

  const openLocationSheet = () => {
    showSheet({
      content: <LocationSheet />,
    });
  };

  const openPickupSheet = () => {
    showSheet({
      content: <PickupSheet />,
    });
  };

  return {
    userLocation,
    setUserLocation,
    openLocationSheet,
    openPickupSheet,
  };
}
