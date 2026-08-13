// Design tokens ported 1:1 from the original Thunkable/React Native code.
export const PRIMARY = '#6366F1';
export const ACCENT = '#EC4899';
export const BG = '#F8F7FF';
export const CARD = '#FFFFFF';
export const TEXT1 = '#1F2937';
export const TEXT2 = '#6B7280';
export const SUCCESS = '#10B981';
export const WARNING = '#F59E0B';
export const ERROR = '#EF4444';
export const BORDER = '#E5E7EB';
export const GOLD = '#F59E0B';
export const PURPLE_LIGHT = '#EEF2FF';
export const PINK_LIGHT = '#FDF2F8';
export const GLASS_BG = 'rgba(255,255,255,0.7)';
export const GLASS_BORDER = 'rgba(255,255,255,0.3)';

export const TAB_MENU_HEIGHT = 56;
export const WEB_TAB_MENU_PADDING = 90;
export const SCROLL_EXTRA_PADDING = 16;

// Reusable card shadows (converted from RN elevation/shadow props)
export const glassCard = {
  background: GLASS_BG,
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 20,
  padding: 16,
  boxShadow: '0 8px 16px rgba(0,0,0,0.10)'
};

export const softCard = {
  background: GLASS_BG,
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 16,
  padding: 14,
  boxShadow: '0 4px 8px rgba(0,0,0,0.08)'
};
