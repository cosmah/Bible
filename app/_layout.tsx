// app/_layout.tsx

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="content/lang" options={{ headerShown: false }} />
      <Stack.Screen name="content/books" options={{ headerShown: false }} />
      <Stack.Screen name="content/book/[book]" options={{ headerShown: false }} />
      <Stack.Screen name="content/bookmark" options={{ headerShown: false }} />
      {/* Add more screens as needed */}
    </Stack>
  );
}
