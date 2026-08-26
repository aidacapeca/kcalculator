import { StyleSheet } from 'react-native';
import theme from './light';

const { colors, spacing, radius, typography, shadows } = theme;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    width: '80%',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...shadows.card,
  },
  buttonText: {
    ...typography.button,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export const dashboardStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  heroCard: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  searchInput: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
  },
  emptyStateContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptyStateText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryHeader: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    backgroundColor: colors.secondaryLight,
    borderRadius: radius.lg - 2,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryTextBlock: {
    paddingRight: spacing.sm,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sliderContent: {
    paddingTop: spacing.xs,
    paddingRight: spacing.sm,
  },
  foodCard: {
    width: 188,
    backgroundColor: colors.surface,
    borderRadius: radius.md + 4,
    padding: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  foodImage: {
    width: '100%',
    height: 108,
    borderRadius: radius.md,
    backgroundColor: colors.secondaryLight,
    marginBottom: spacing.sm,
  },
  foodImageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodImageFallbackText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    minHeight: 40,
    lineHeight: 20,
  },
  foodMeta: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
    minHeight: 38,
  },
  loading: {
    ...typography.body,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  error: {
    ...typography.body,
    textAlign: 'center',
    color: colors.error,
  },
});

export const foodDetailsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
  errorIcon: {
    backgroundColor: colors.error,
  },
  errorText: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  retryButton: {
    marginTop: spacing.lg,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.secondaryLight,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    letterSpacing: 0.4,
  },
  amountControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  amountBox: {
    width: 132,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 40,
  },
  amountInputContent: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 0,
    color: colors.textPrimary,
  },
  unitText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  amountButtons: {
    marginLeft: spacing.xs,
    justifyContent: 'center',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    columnGap: spacing.md,
    rowGap: spacing.xs,
    marginBottom: spacing.lg,
  },
  nutritionText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  nutritionValue: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  addButton: {
    marginBottom: spacing.lg,
    borderRadius: radius.md,
  },
  addButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  sectionCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionDivider: {
    marginBottom: spacing.xs,
    backgroundColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    color: colors.textPrimary,
    maxWidth: '55%',
    textAlign: 'right',
  },
});

export const routerStyles = StyleSheet.create({
  drawerModal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  drawerSheet: {
    width: '78%',
    height: '100%',
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  drawerTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'left',
  },
  drawerSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.lg,
  },
  drawerContent: {
    flex: 1,
  },
  drawerContentInner: {
    paddingBottom: spacing.md,
  },
  drawerText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  drawerItemCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  drawerItemTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  drawerItemMeta: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  drawerSummary: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    margin: 0,
    marginRight: spacing.xs,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  drawerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
