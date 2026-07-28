import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { add, byId, money } from '../../store';
import { t } from '../../theme';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = byId(id);
  if (!p) return <View style={s.wrap}><Text style={s.blurb}>No product “{id}”.</Text></View>;

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: t.pad, gap: 14 }}>
      <Stack.Screen options={{ title: p.name }} />
      <View style={[s.hero, { backgroundColor: `hsl(${p.hue} 45% 22%)` }]}>
        <Text style={[s.glyph, { color: `hsl(${p.hue} 70% 68%)` }]}>{p.name[0]}</Text>
      </View>
      <Text style={s.name}>{p.name}</Text>
      <Text style={s.price}>{money(p.price)}</Text>
      <Text style={s.blurb}>{p.blurb}</Text>
      <Pressable
        style={({ pressed }) => [s.btn, pressed && { opacity: 0.8 }]}
        onPress={() => { add(p.id); router.push('/cart'); }}>
        <Text style={s.btnText}>Add to cart</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: t.bg },
  hero: { aspectRatio: 1.3, borderRadius: t.radius, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 96, fontWeight: '800' },
  name: { color: t.text, fontSize: 26, fontWeight: '700', letterSpacing: -0.4 },
  price: { color: t.accent, fontSize: 20, fontWeight: '600' },
  blurb: { color: t.dim, fontSize: 16, lineHeight: 24 },
  btn: { backgroundColor: t.accent, borderRadius: t.radius, paddingVertical: 15, alignItems: 'center', marginTop: 6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
