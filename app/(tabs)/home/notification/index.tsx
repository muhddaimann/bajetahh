import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  Text,
  Card,
  useTheme,
  Divider,
  Icon,
  Avatar,
  IconButton,
  Chip,
} from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import { useTabs } from "../../../../contexts/tabContext";
import Header from "../../../../components/shared/header";
import ScrollTop from "../../../../components/shared/scrollTop";
import { useNotification } from "../../../../hooks/useNotification";
import NoData from "../../../../components/shared/noData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NOTIFICATION_FILTERS = [
  { id: 'all', label: 'All', icon: 'bell-outline' },
  { id: 'order', label: 'Orders', icon: 'package-variant-closed' },
  { id: 'promo', label: 'Promos', icon: 'ticket-percent-outline' },
  { id: 'system', label: 'System', icon: 'cog-outline' },
  { id: 'alert', label: 'Alerts', icon: 'alert-circle-outline' },
];

export default function NotificationPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAll 
  } = useNotification();
  
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter(n => n.type === activeFilter);
  }, [notifications, activeFilter]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return 'package-variant-closed';
      case 'promo': return 'ticket-percent';
      case 'system': return 'cog';
      case 'alert': return 'alert-circle';
      default: return 'bell';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'order': return '#2196F3';
      case 'promo': return '#FF9800';
      case 'system': return '#607D8B';
      case 'alert': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: tokens.spacing["3xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Header
            title="Notifications"
            subtitle="Stay updated with your orders"
            showBack
          />
        </View>

        {/* Filter Row */}
        <View style={{ marginTop: tokens.spacing.md }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.sm,
              alignItems: 'center'
            }}
          >
            {NOTIFICATION_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const color = getColor(filter.id);
              
              return (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: isActive ? tokens.spacing.md : tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radii.pill,
                    backgroundColor: isActive ? color + '15' : theme.colors.surface,
                    borderWidth: 1,
                    borderColor: isActive ? color : theme.colors.outlineVariant,
                    gap: tokens.spacing.xs,
                    minWidth: 44,
                    height: 38,
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons 
                    name={(isActive ? filter.icon.replace('-outline', '') : filter.icon) as any} 
                    size={20} 
                    color={isActive ? color : theme.colors.onSurfaceVariant} 
                  />
                  {isActive && (
                    <Text 
                      variant="labelLarge" 
                      style={{ 
                        color: color, 
                        fontWeight: '800',
                        fontSize: 13
                      }}
                    >
                      {filter.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {notifications.length > 0 ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg }}>
            {/* Action Row */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginVertical: tokens.spacing.sm,
            }}>
              <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant, fontWeight: '800' }}>
                {filteredNotifications.length} {activeFilter === 'all' ? '' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Notifications
              </Text>
              <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
                <IconButton 
                  icon={"check-all" as any} 
                  size={18} 
                  mode="contained-tonal"
                  onPress={markAllAsRead}
                  style={{ backgroundColor: theme.colors.primaryContainer + '40', margin: 0 }}
                  iconColor={theme.colors.primary}
                />
                <IconButton 
                  icon={"delete-sweep-outline" as any} 
                  size={18} 
                  mode="contained-tonal"
                  onPress={clearAll} 
                  style={{ backgroundColor: theme.colors.errorContainer + '40', margin: 0 }}
                  iconColor={theme.colors.error}
                />
              </View>
            </View>

            <View style={{ gap: tokens.spacing.md }}>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <TouchableOpacity 
                    key={n.id} 
                    onPress={() => markAsRead(n.id)}
                    activeOpacity={0.7}
                  >
                    <Card 
                      style={{ 
                        backgroundColor: n.read ? theme.colors.surface : theme.colors.primaryContainer + '10',
                        borderRadius: tokens.radii.xl,
                        borderLeftWidth: n.read ? 0 : 4,
                        borderLeftColor: getColor(n.type),
                      }}
                    >
                      <Card.Content style={{ flexDirection: 'row', padding: tokens.spacing.md, gap: tokens.spacing.md }}>
                        <Avatar.Icon 
                          size={40} 
                          icon={getIcon(n.type) as any} 
                          style={{ backgroundColor: getColor(n.type) + '20' }}
                          color={getColor(n.type)}
                        />
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Text variant="titleSmall" style={{ fontWeight: n.read ? '700' : '900', flex: 1 }}>
                              {n.title}
                            </Text>
                            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                              {formatTime(n.timestamp)}
                            </Text>
                          </View>
                          <Text 
                            variant="bodySmall" 
                            style={{ 
                              color: theme.colors.onSurfaceVariant,
                              marginTop: 2,
                              lineHeight: 16
                            }}
                          >
                            {n.message}
                          </Text>
                        </View>
                        <IconButton 
                          icon={"close" as any} 
                          size={16} 
                          onPress={() => deleteNotification(n.id)} 
                          style={{ margin: -8 }}
                        />
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ marginTop: tokens.spacing["2xl"] }}>
                  <NoData 
                    title="No Notifications Found" 
                    description={`You don't have any ${activeFilter} notifications at the moment.`}
                    icon={(NOTIFICATION_FILTERS.find(f => f.id === activeFilter)?.icon || 'bell-off-outline') as any}
                    buttonLabel="View All"
                    onPress={() => setActiveFilter('all')}
                  />
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={{ marginTop: tokens.spacing["3xl"], paddingHorizontal: tokens.spacing.lg }}>
            <NoData 
              title="No Notifications" 
              description="You're all caught up! New notifications will appear here." 
              icon={"bell-off-outline" as any}
            />
          </View>
        )}
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
