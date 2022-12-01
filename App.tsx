import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import { RecoilRoot } from 'recoil'

// import Bootstrap from './src/app/Bootstrap'
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/app/Main';
import {RecoilRoot} from 'recoil';
import Bootstrap from './src/app/Bootstrap';

// initApi();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RecoilRoot>
          <Bootstrap>
            <Main />
          </Bootstrap>
        </RecoilRoot>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
