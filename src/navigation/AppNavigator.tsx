import React, { useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { lightTheme, darkTheme } from '../constants/theme';
import { createLightNavTheme, createDarkNavTheme } from './navigationTheme';
import BottomTabs from './BottomTabs';
import StackNavigation from './StackNavigation';

const AppNavigator = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const navTheme = useMemo(() => {
    return mode === 'light'
      ? createLightNavTheme(lightTheme)
      : createDarkNavTheme(darkTheme);
  }, [mode]);

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
