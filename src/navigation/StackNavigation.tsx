import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackNavigationParamList } from './types'
import {SCREENS} from '../constants/screens'
import BottomTabs from './BottomTabs';
import AuthGate from './AuthGate';

const Stack = createNativeStackNavigator<StackNavigationParamList>();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="AuthGate" component={AuthGate} />
      <Stack.Screen name="OnBoardingScreen" component={SCREENS.OnBoardingScreen} />
      <Stack.Screen name="LoginScreen" component={SCREENS.LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={SCREENS.RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={SCREENS.OTPScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={SCREENS.ForgotPasswordScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={SCREENS.ResetPasswordScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
