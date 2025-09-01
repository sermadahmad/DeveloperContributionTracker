import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const createLightNavTheme = (theme: typeof import('../constants/theme').lightTheme): Theme => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.light,
    card: theme.primary,
    text: theme.dark,
    border: theme.tertiary,
    notification: theme.secondary,
  },
});

export const createDarkNavTheme = (theme: typeof import('../constants/theme').darkTheme): Theme => ({
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.light,
    card: theme.primary,
    text: theme.dark,
    border: theme.tertiary,
    notification: theme.secondary,
  },
});
