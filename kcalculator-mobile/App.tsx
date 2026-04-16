import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import Router from './src/navigation/Router';
import appTheme from './src/styles/light';

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: appTheme.colors.primary,
    secondary: appTheme.colors.secondary,
    background: appTheme.colors.background,
    surface: appTheme.colors.surface,
    error: appTheme.colors.error,
    onPrimary: appTheme.colors.textOnPrimary,
    onSurface: appTheme.colors.textPrimary,
    onSurfaceVariant: appTheme.colors.textSecondary,
    outline: appTheme.colors.border,
    surfaceVariant: appTheme.colors.secondaryLight,
  },
};

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <Router />
    </PaperProvider>
  );
}