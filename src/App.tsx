import React, { useEffect } from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Appearance } from 'react-native';
import store, { persistor, RootState } from './redux/store';
import { setTheme, setThemeFromSystem } from './redux/themeSlice';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './components/LoadingScreen';
import auth from '@react-native-firebase/auth'

function ThemeListener() {
  const dispatch = useDispatch();
  const userSelected = useSelector((state: RootState) => state.theme.userSelected);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme && !userSelected) {
        dispatch(setThemeFromSystem(colorScheme));
      }
    });
    return () => sub.remove();
  }, [userSelected, dispatch]);

  useEffect(() => {
    // This will succeed only after proper native config
    const sub = auth().onAuthStateChanged(user => {
      console.log('Auth state changed. User:', user ? user.uid : 'none');
    });
    return sub; // unsubscribe on unmount
  }, []);

  return <AppNavigator />;
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeListener />
      </PersistGate>
    </Provider>
  )
}

export default App;

