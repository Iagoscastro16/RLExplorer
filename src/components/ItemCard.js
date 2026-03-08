import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, spacing, radius, rarity, slotEmojis, qualityMap, slotMap } from '../styles/global';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function ItemCard({ item, onPress }) {
  const rarityName = qualityMap[item.quality] || 'Common';
  const slotName = slotMap[item.slot] || 'Item';
  const rarityStyle = rarity[rarityName] || rarity['Common'];
  const slotEmoji = slotEmojis[slotName] || slotEmojis['default'];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: rarityStyle.bg }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.topBorder, { backgroundColor: rarityStyle.accent }]} />

      <View style={[styles.iconContainer, { borderColor: rarityStyle.accent }]}>
        <Text style={styles.emoji}>{slotEmoji}</Text>
      </View>

      <View style={[styles.rarityBadge, { backgroundColor: rarityStyle.accent + '30', borderColor: rarityStyle.accent }]}>
        <Text style={[styles.rarityText, { color: rarityStyle.accent }]}>
          {rarityName}
        </Text>
      </View>

      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

      <Text style={styles.slot}>{slotName}</Text>

      <View style={styles.tagsRow}>
        {item.paintable && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{'\u{1F3A8}'}</Text>
          </View>
        )}
        {item.tradable && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{'\u{1F504}'}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: spacing.sm - 2,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
    backgroundColor: colors.bg,
  },
  emoji: {
    fontSize: 28,
  },
  rarityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  slot: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.sm - 2,
    paddingHorizontal: spacing.sm - 2,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
  },
});
