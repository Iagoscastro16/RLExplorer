import React from "React";

import { TouchableOpacity,Text,View,StyleSheet,Dimensions } from "react-native";


const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2;

const RARITY_COLORS = {
    'Common': {bg: '#2A2A35', accent: '#9CA3AF', label: 'Common'},
    'Uncommon': { bg: '#1A2E1A', accent: '#4ADE80', label: 'Uncommon' },
    'Rare': { bg: '#1A1F2E', accent: '#60A5FA', label: 'Rare' },
    'Very Rare': { bg: '#1E1A2E', accent: '#A78BFA', label: 'Very Rare' },
    'Import': { bg: '#2E1A1A', accent: '#F87171', label: 'Import' },
    'Exotic': { bg: '#2E2A1A', accent: '#FBBF24', label: 'Exotic' },
    'Black Market': { bg: '#1A1A1A', accent: '#EC4899', label: 'Black Market' },
    'Limited': { bg: '#2E2520', accent: '#FB923C', label: 'Limited' },
};

function getRarityStyle(rarityName) {
    return RARITY_COLORS[rarityName || RARITY_COLORS['Common']]
} 

function getSlotEmoji(slotName) {
    const emojis = {
         'Body': '🚗',
    'Wheels': '⚙️',
    'Boost': '🔥',
    'Decal': '🎨',
    'Topper': '🎩',
    'Antenna': '📡',
    'Goal Explosion': '💥',
    'Trail': '✨',
    'Banner': '🏳️',
    'Avatar Border': '🖼️',
    };
    return emojis[slotName] || '📦'
}

export default function ItemCard({ item, onPress }) {
  const rarityStyle = getRarityStyle(item.rarity?.name);
  const slotEmoji = getSlotEmoji(item.slot?.name);

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
          {item.rarity?.name || 'Common'}
        </Text>
      </View>

      
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>

      
      <Text style={styles.slot}>{item.slot?.name || 'Item'}</Text>

      
      <View style={styles.tagsRow}>
        {item.paintable && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>🎨</Text>
          </View>
        )}
        {item.tradeable && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>🔄</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 6,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A35',
    overflow: 'hidden',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#0A0A0F',
  },
  emoji: {
    fontSize: 28,
  },
  rarityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 20,
  },
  slot: {
    color: '#6B7280',
    fontSize: 11,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    backgroundColor: '#1A1A24',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
  },
});
