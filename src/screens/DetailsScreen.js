import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { products } from '@rocketleagueapi/items';
import { colors, spacing, radius, rarity, slotEmojis, qualityMap, slotMap, paintColors } from '../styles/global';

function InfoRow({ label, value, accent }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, accent && { color: accent }]}>{value}</Text>
    </View>
  );
}

function TagBadge({ text, color }) {
  return (
    <View style={[styles.tag, { backgroundColor: color + '25', borderColor: color }]}>
      <Text style={[styles.tagText, { color }]}>{text}</Text>
    </View>
  );
}

export default function DetailsScreen({ route, navigation }) {
  const { itemName } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    try {
      setLoading(true);
      const found = Object.values(products).find(p => p.name === itemName);
      if (!found) throw new Error('Item não encontrado');
      setItem(found);
      navigation.setOptions({ title: found.name });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes deste item.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Item não encontrado.</Text>
      </View>
    );
  }

  const rarityName = qualityMap[item.quality] || 'Common';
  const slotName = slotMap[item.slot] || 'Item';
  const rarityStyle = rarity[rarityName] || rarity['Common'];
  const slotEmoji = slotEmojis[slotName] || slotEmojis['default'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <View style={[styles.hero, { borderColor: rarityStyle.accent }]}>
        <View style={[styles.glow, { backgroundColor: rarityStyle.accent + '20' }]} />
        <View style={[styles.heroIconContainer, { borderColor: rarityStyle.accent }]}>
          <Text style={styles.heroEmoji}>{slotEmoji}</Text>
        </View>
        <Text style={styles.heroName}>{item.name}</Text>
      </View>

      {/* Badges */}
      <View style={styles.badgesRow}>
        <TagBadge text={rarityName} color={rarityStyle.accent} />
        <TagBadge text={slotName} color={colors.accent} />
        {item.paintable && <TagBadge text={'\u{1F3A8} Pintável'} color="#4ADE80" />}
        {item.tradable
          ? <TagBadge text={'\u{1F504} Trocável'} color="#A78BFA" />
          : <TagBadge text={'\u{1F512} Não Trocável'} color={colors.error} />
        }
      </View>

      {/* Informações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'\u{1F4CB} Informações'}</Text>
        <View style={styles.infoCard}>
          <InfoRow label="Nome"       value={item.name} />
          <InfoRow label="Tipo"       value={slotName} />
          <InfoRow label="Raridade"   value={rarityName} accent={rarityStyle.accent} />
          <InfoRow label="Pintável"   value={item.paintable ? '\u2705 Sim' : '\u274C Não'} />
          <InfoRow label="Trocável"   value={item.tradable  ? '\u2705 Sim' : '\u274C Não'} />
          <InfoRow label="Blueprint"  value={item.blueprint ? '\u2705 Sim' : '\u274C Não'} />
          <InfoRow label="Trade-In"   value={item.tradeIn   ? '\u2705 Sim' : '\u274C Não'} />
        </View>
      </View>

      {/* Pinturas */}
      {item.paintable && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'\u{1F3A8} Pinturas disponíveis'}</Text>
          <View style={styles.paintsGrid}>
            {paintColors.map((paint) => (
              <View key={paint.name} style={styles.paintItem}>
                <View style={[styles.paintDot, { backgroundColor: paint.color }]} />
                <Text style={styles.paintName}>{paint.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    gap: spacing.md,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  hero: {
    alignItems: 'center',
    padding: spacing.xxl,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -60,
  },
  heroIconContainer: {
    width: 100,
    height: 100,
    borderRadius: spacing.xl,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    marginBottom: spacing.lg,
  },
  heroEmoji: {
    fontSize: 52,
  },
  heroName: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: spacing.sm,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm + 2,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardAlt,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  paintsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm + 2,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md + 2,
  },
  paintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm - 2,
    width: '46%',
  },
  paintDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  paintName: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
