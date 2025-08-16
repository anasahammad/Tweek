
import SignOutButton from '@/components/SignOutButton';
import { useUserSync } from '@/hooks/useUserSync';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    useUserSync()
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <Text>Home Screen</Text>
            <SignOutButton/>
        </SafeAreaView>
    );
};

export default HomeScreen;