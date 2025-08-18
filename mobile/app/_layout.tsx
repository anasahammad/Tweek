import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
       <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark"/>
      </QueryClientProvider>
    </ClerkProvider>
  );
}


// Todo: 
// 1: Follow/Unfollow
// 2: Delete Comment
// 3: Update Profile Image and Banner
// 4: Implement Search Screen
// 5: Implement Messaging (use Firebase/Supabase or Convex)