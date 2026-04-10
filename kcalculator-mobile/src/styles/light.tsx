export const colors = {
    primary: '#FF5722',        
    primaryPressed: '#E64A19',
  
    secondary: '#66BB6A',     
    secondaryLight: '#C8E6C9',
  
    accent: '#FFCA28',         
  
    background: '#F4F6F8',
    surface: '#FFFFFF',
  
    textPrimary: '#1F2933',
    textSecondary: '#52606D',
    textOnPrimary: '#FFFFFF',
  
    success: '#2E7D32',
    warning: '#F59E0B',
    error: '#EF5350',
  
    border: '#E4E7EB',
    disabled: '#9AA5B1',
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
      color: colors.textPrimary,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
      color: colors.textPrimary,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: colors.textPrimary,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      color: colors.textSecondary,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.textOnPrimary,
    },
  };
  
  export const shadows = {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
  };
  
  export const theme = {
    colors,
    spacing,
    radius,
    typography,
    shadows,
  };
  
  export default theme;