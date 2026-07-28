import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { add, byId, money, total, useCart } from '../store';
import { t } from '../theme';

export default function Cart() {
  const cart = useCart();
  const lines = Object.entries(cart);

  if (!lines.length) {
    return <View style={s.empty}><Text style={s.dim}>Your cart is empty.</Text></View>;
  }

  return (
    <View style={s.wrap}>
      <FlatList
        data={lines}
        keyExtractor={([id]) => id}
        contentContainerStyle={{ padding: t.pad, gap: 12 }}
        renderItem={({ item: [id, qty] }) => {
          const p = byId(id)!;
          return (
            <View style={s.row}>
              <View style={[s.swatch, { backgroundColor: `hsl(${p.hue} 45% 22%)` }]}>
                <Text style={[s.glyph, { color: `hsl(${p.hue} 70% 68%)` }]}>{p.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{p.name}</Text>
                <Text style={s.dim}>{money(p.price)} each</Text>
              </View>
              <View style={s.stepper}>
                <Step label="−" onPress={() => add(id, -1)} />
                <Text style={s.qty}>{qty}</Text>
                <Step label="+" onPress={() => add(id, 1)} />
              </View>
            </View>
          );
        }}
      />
      <View style={s.footer}>
        <View style={s.totalRow}>
          <Text style={s.name}>Total</Text>
          <Text style={s.total}>{money(total(cart))}</Text>
        </View>
        {/* Wire this to your payment provider — /v1/commerce/checkout in Hanzo. */}
        <Pressable style={s.btn}><Text style={s.btnText}>Checkout</Text></Pressable>
      </View>
    </View>
  );
}

const Step = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <Pressable onPress={onPress} style={s.step} hitSlop={8}>
    <Text style={s.stepText}>{label}</Text>
  </Pressable>
);

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: t.bg },
  empty: { flex: 1, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  swatch: { width: 56, height: 56, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 24, fontWeight: '800' },
  name: { color: t.text, fontSize: 16, fontWeight: '600' },
  dim: { color: t.dim, fontSize: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  step: { width: 30, height: 30, borderRadius: 15, backgroundColor: t.card, borderWidth: 1, borderColor: t.line, alignItems: 'center', justifyContent: 'center' },
  stepText: { color: t.text, fontSize: 17, lineHeight: 19 },
  qty: { color: t.text, fontSize: 16, minWidth: 18, textAlign: 'center' },
  footer: { borderTopWidth: 1, borderTopColor: t.line, padding: t.pad, gap: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  total: { color: t.text, fontSize: 22, fontWeight: '700' },
  btn: { backgroundColor: t.accent, borderRadius: t.radius, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
