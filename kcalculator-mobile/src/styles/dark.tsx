export const darkColors = {
    primary: '#FF7043',        
    primaryPressed: '#E64A19',
  
    secondary: '#81C784',     
    secondaryLight: '#1B5E20',
  
    accent: '#FFD54F',
  
    background: '#121212',
    surface: '#1E1E1E',
  
    textPrimary: '#E5E7EB',
    textSecondary: '#9AA5B1',
    textOnPrimary: '#FFFFFF',
  
    success: '#66BB6A',
    warning: '#FBBF24',
    error: '#EF5350',
  
    border: '#2E2E2E',
    disabled: '#6B7280',
  };
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  
  export const radius = {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 28,
  };
  
  export const typography = {
    h1: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: darkColors.textPrimary,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
      color: darkColors.textPrimary,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: darkColors.textPrimary,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      color: darkColors.textSecondary,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: darkColors.textOnPrimary,
    },
  };
  
  export const shadows = {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  };
  
  export const darkTheme = {
    colors: darkColors,
    spacing,
    radius,
    typography,
    shadows,
  };
  
  export default darkTheme;