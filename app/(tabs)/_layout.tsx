import { BottomNavigation } from '@components';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs tabBar={(props) => <BottomNavigation {...props} />}>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="search" options={{ headerShown: false }} />
      <Tabs.Screen name="library" options={{ headerShown: false }} />
    </Tabs>
  );
}
