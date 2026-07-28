import { Tabs } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { count, useCart } from '../store';
import { t } from '../theme';

const icon = (glyph: string) => ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>{glyph}</Text>
);

export default function RootLayout() {
  const n = count(useCart());
  return (
    <>
      <Head>
        <title>Hanzo Shop</title>
      </Head>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: t.accent,
          tabBarInactiveTintColor: t.dim,
          tabBarStyle: { backgroundColor: t.card, borderTopColor: t.line },
          headerStyle: { backgroundColor: t.bg },
          headerTintColor: t.text,
          sceneStyle: { backgroundColor: t.bg },
        }}>
        <Tabs.Screen name="index" options={{ title: 'Shop', tabBarIcon: icon('◆') }} />
        <Tabs.Screen
          name="cart"
          options={{ title: 'Cart', tabBarIcon: icon('▤'), tabBarBadge: n || undefined }}
        />
        <Tabs.Screen name="p/[id]" options={{ href: null, title: 'Product' }} />
      </Tabs>
    </>
  );
}
