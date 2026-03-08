import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { products } from '@rocketleagueapi/items';
import ItemCard from '../components/ItemCard';
import { colors, spacing, radius } from '../styles/global';

const ITEMS_PER_PAGE = 20;

const CATEGORIES = [
  { label: 'Todos',                            value: null },
  { label: '\u{1F697} Carros',                 value: [0, 13, 25] },
  { label: '\u{1F3A8} Decais',                 value: [1] },
  { label: '\u2699\uFE0F Rodas',               value: [2, 9, 15] },
  { label: '\u{1F525} Boosts',                 value: [3] },
  { label: '\u{1F4A5} Explosões',              value: [4] },
  { label: '\u{1F3A9} Toppers',                value: [5] },
  { label: '\u{1F4E1} Antenas',                value: [16] },
  { label: '\u2728 Trilhas',                   value: [14] },
  { label: '\u{1F3F3}\uFE0F Banners',          value: [22] },
  { label: '\u{1F3B5} Hinos',                  value: [18] },
  { label: '\u{1F5BC}\uFE0F Avatar',           value: [24] },
];

export default function HomeScreen({ navigation }) {
  const [allItems, setAllItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    try {
      setLoading(true);
      const itemsArray = Object.values(products);
      setAllItems(itemsArray);
      setDisplayedItems(itemsArray.slice(0, ITEMS_PER_PAGE));
      setHasMore(itemsArray.length > ITEMS_PER_PAGE);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os itens.');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredItems = useCallback(() => {
    let filtered = allItems;
    if (activeCategory !== null) {
      filtered = Array.isArray(activeCategory)
        ? filtered.filter(item => activeCategory.includes(item.slot))
        : filtered.filter(item => item.slot === activeCategory);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(item => item.name?.toLowerCase().includes(query));
    }
    return filtered;
  }, [allItems, search, activeCategory]);

  useEffect(() => {
    const filtered = getFilteredItems();
    setPage(1);
    setDisplayedItems(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [search, activeCategory, getFilteredItems]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const filtered = getFilteredItems();
    const nextPage = page + 1;
    const newItems = filtered.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedItems(newItems);
    setPage(nextPage);
    setHasMore(newItems.length < filtered.length);
    setLoadingMore(false);
  };

  const handleCardPress = (item) => {
    navigation.navigate('Details', { itemName: item.name });
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.accent} size="small" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>{'\u{1F50D}'}</Text>
      <Text style={styles.emptyText}>Nenhum item encontrado</Text>
      <Text style={styles.emptySubtext}>Tente outro termo ou categoria</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.loadingText}>Carregando itens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={'\u{1F50D}  Buscar item...'}
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
            <Text style={styles.clearText}>{'\u2715'}</Text>
          </TouchableOpacity>
        )}
      </View>

      
<View style={styles.categoryWrapper}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryList}
  >
    {CATEGORIES.map((item, index) => (
      <TouchableOpacity
        key={String(index)}
        style={[styles.categoryBtn, activeCategory === item.value && styles.categoryBtnActive]}
        onPress={() => setActiveCategory(item.value)}
      >
        <Text style={[styles.categoryText, activeCategory === item.value && styles.categoryTextActive]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

      <Text style={styles.counter}>{displayedItems.length} itens exibidos</Text>

      <FlatList
        data={displayedItems}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => <ItemCard item={item} onPress={handleCardPress} />}
        numColumns={2}
        contentContainerStyle={styles.grid}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.md,
    backgroundColor: colors.cardAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md + 2,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: spacing.md,
  },
  clearBtn: {
    padding: spacing.sm - 2,
  },
  clearText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingRight: spacing.xl,
    gap: spacing.sm,
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: spacing.md + 2,
    paddingVertical: 7,
    borderRadius: radius.full,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    height: 34, 
    justifyContent: 'center',
  },
  categoryBtnActive: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
  },
  categoryText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.accent,
  },
  counter: {
    color: colors.textDim,
    fontSize: 11,
    textAlign: 'right',
    paddingRight: spacing.lg,
    paddingBottom: spacing.xs,
  },
  grid: {
    paddingHorizontal: spacing.sm - 2,
    paddingBottom: spacing.xl,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: spacing.sm,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: 14,
  },
  categoryWrapper: {
  height: 44,
  marginBottom: spacing.sm,
},
});
