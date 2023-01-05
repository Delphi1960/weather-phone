import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/app/Main';
import {RecoilRoot} from 'recoil';
import Bootstrap from './src/app/Bootstrap';
import {Provider as PaperProvider} from 'react-native-paper';

// initApi();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RecoilRoot>
          <PaperProvider>
            <Bootstrap>
              <Main />
            </Bootstrap>
          </PaperProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
