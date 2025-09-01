export type StackNavigationParamList = {
    AuthGate: undefined;
    OnBoardingScreen: undefined;

    LoginScreen: undefined;
    RegisterScreen: undefined;
    OTPScreen: undefined;
    ForgotPasswordScreen: undefined;
    ResetPasswordScreen: { email: string };

    BottomTabs: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Compare: { userA?: string; userB?: string, comparisonId?: number } | undefined;
  Comparisons: undefined;
  Profile: undefined;
};
