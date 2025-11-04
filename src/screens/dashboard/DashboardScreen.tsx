import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@store/authStore';
import { useCreatorStore } from '@store/creatorStore';
import { CHART_COLORS } from '@constants/config';

const { width: screenWidth } = Dimensions.get('window');

const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);
  const { creators, fetchCreators, isLoading } = useCreatorStore();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalCreators: 0,
    totalFollowers: 0,
    totalRevenue: 0,
    totalContent: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Calculate stats from creators
    const totalCreators = creators.length;
    const totalFollowers = creators.reduce((sum, c) => sum + c.followers, 0);
    const totalRevenue = creators.reduce((sum, c) => sum + c.monthlyRevenue, 0);
    const totalContent = 0; // Will be calculated from contents

    setStats({
      totalCreators,
      totalFollowers,
      totalRevenue,
      totalContent,
    });
  }, [creators]);

  const loadData = async () => {
    await fetchCreators();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const StatCard = ({
    icon,
    title,
    value,
    color,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value: string | number;
    color: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </TouchableOpacity>
  );

  const QuickAction = ({
    icon,
    title,
    color,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Willkommen zurück,</Text>
            <Text style={styles.userName}>{user?.name || 'Creator'} 👋</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={40} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Übersicht</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="people"
              title="Creator"
              value={stats.totalCreators}
              color={CHART_COLORS.primary}
              onPress={() => navigation.navigate('Creators')}
            />
            <StatCard
              icon="heart"
              title="Follower"
              value={
                stats.totalFollowers >= 1000
                  ? `${(stats.totalFollowers / 1000).toFixed(1)}K`
                  : stats.totalFollowers
              }
              color={CHART_COLORS.danger}
            />
            <StatCard
              icon="cash"
              title="Umsatz"
              value={`€${stats.totalRevenue.toFixed(2)}`}
              color={CHART_COLORS.success}
              onPress={() => navigation.navigate('Analytics')}
            />
            <StatCard
              icon="images"
              title="Content"
              value={stats.totalContent}
              color={CHART_COLORS.warning}
              onPress={() => navigation.navigate('Content')}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Schnellaktionen</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              icon="add-circle"
              title="Creator hinzufügen"
              color={CHART_COLORS.primary}
              onPress={() => navigation.navigate('CreatorEdit', { creatorId: undefined })}
            />
            <QuickAction
              icon="cloud-upload"
              title="Content hochladen"
              color={CHART_COLORS.secondary}
              onPress={() => {
                if (creators.length > 0) {
                  navigation.navigate('ContentUpload', { creatorId: creators[0].id });
                } else {
                  Alert.alert('Aktion erforderlich', 'Bitte füge zuerst einen Creator hinzu.');
                }
              }}
            />
            <QuickAction
              icon="chatbubble"
              title="AI Chat"
              color={CHART_COLORS.info}
              onPress={() => {
                if (creators.length > 0) {
                  navigation.navigate('Chat', { creatorId: creators[0].id });
                }
              }}
            />
            <QuickAction
              icon="bar-chart"
              title="Analytics"
              color={CHART_COLORS.success}
              onPress={() => navigation.navigate('Analytics')}
            />
          </View>
        </View>

        {/* Recent Creators */}
        {creators.length > 0 && (
          <View style={styles.recentCreatorsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Aktuelle Creator</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Creators')}>
                <Text style={styles.seeAllText}>Alle anzeigen</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {creators.slice(0, 5).map((creator) => (
                <TouchableOpacity
                  key={creator.id}
                  style={styles.creatorCard}
                  onPress={() => navigation.navigate('CreatorDetail', { creatorId: creator.id })}
                >
                  <View style={styles.creatorAvatar}>
                    <Text style={styles.creatorInitial}>
                      {creator.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.creatorName} numberOfLines={1}>
                    {creator.name}
                  </Text>
                  <Text style={styles.creatorFollowers}>
                    {creator.followers >= 1000
                      ? `${(creator.followers / 1000).toFixed(1)}K`
                      : creator.followers}{' '}
                    Follower
                  </Text>
                  <View style={styles.creatorPlatforms}>
                    {creator.platforms.map((platform, index) => (
                      <Ionicons
                        key={index}
                        name={
                          platform.type === 'youtube'
                            ? 'logo-youtube'
                            : platform.type === 'instagram'
                              ? 'logo-instagram'
                              : platform.type === 'tiktok'
                                ? 'musical-notes'
                                : 'globe'
                        }
                        size={16}
                        color="#666"
                        style={styles.platformIcon}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Empty State */}
        {creators.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={80} color="#C0C0C0" />
            <Text style={styles.emptyStateTitle}>Keine Creator vorhanden</Text>
            <Text style={styles.emptyStateText}>
              Füge deinen ersten Creator hinzu, um loszulegen
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('CreatorEdit', { creatorId: undefined })}
            >
              <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.emptyStateButtonText}>Creator hinzufügen</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (screenWidth - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    minWidth: (screenWidth - 52) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  recentCreatorsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
  },
  creatorCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  creatorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  creatorInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  creatorFollowers: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  creatorPlatforms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    marginLeft: 8,
  },
});

export default DashboardScreen;
