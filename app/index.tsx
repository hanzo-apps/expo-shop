import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { money, Product, products } from '../store';
import { t } from '../theme';

export default function Shop() {
  return (
    <FlatList
      style={s.list}
      numColumns={2}
      data={products}
      keyExtractor={(p) => p.id}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ padding: t.pad, gap: 12 }}
      ListHeaderComponent={<Text style={s.h1}>New in</Text>}
      renderItem={({ item }) => <Card p={item} />}
    />
  );
}

function Card({ p }: { p: Product }) {
  return (
    <Link href={{ pathname: '/p/[id]', params: { id: p.id } }} asChild>
      <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.65 }]}>
        {/* Generated swatch instead of a bundled JPEG: keeps the template a few
            kB and makes it obvious where your product image goes. */}
        <View style={[s.swatch, { backgroundColor: `hsl(${p.hue} 45% 22%)` }]}>
          <Text style={[s.glyph, { color: `hsl(${p.hue} 70% 68%)` }]}>{p.name[0]}</Text>
        </View>
        <Text style={s.name} numberOfLines={1}>{p.name}</Text>
        <Text style={s.price}>{money(p.price)}</Text>
      </Pressable>
    </Link>
  );
}

const s = StyleSheet.create({
  list: { flex: 1, backgroundColor: t.bg },
  h1: { color: t.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.5, marginBottom: 8 },
  card: { flex: 1, gap: 6 },
  swatch: { aspectRatio: 1, borderRadius: t.radius, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 44, fontWeight: '800' },
  name: { color: t.text, fontSize: 15, fontWeight: '600' },
  price: { color: t.dim, fontSize: 14 },
});
