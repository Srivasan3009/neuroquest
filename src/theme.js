// Design tokens — premium "Midnight Glass" theme (Glassmorphism).
// Generated with the ui-ux-pro-max design system: glassmorphism style +
// Classic Elegant typography (Playfair Display / Inter) + premium gold accents.

export const PRIMARY = '#6366F1';
export const PRIMARY_GRAD = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)';
export const ACCENT = '#E8B34B';
export const GOLD = '#E8B34B';
export const GOLD_GRAD = 'linear-gradient(135deg, #F5CF6E 0%, #D9A441 100%)';
export const BG = '#0B0F1F';
export const CARD = 'rgba(255,255,255,0.08)';
export const TEXT1 = '#F4F6FF';
export const TEXT2 = '#A9B0C7';
export const SUCCESS = '#34D399';
export const WARNING = '#FBBF24';
export const ERROR = '#F87171';
export const BORDER = 'rgba(255,255,255,0.12)';
export const PURPLE_LIGHT = 'rgba(129,140,248,0.18)';
export const PINK_LIGHT = 'rgba(244,114,182,0.14)';
export const GLASS_BG = 'rgba(255,255,255,0.08)';
export const GLASS_BORDER = 'rgba(255,255,255,0.14)';
export const SUCCESS_BG = 'rgba(52,211,153,0.12)';
export const ERROR_BG = 'rgba(248,113,113,0.12)';
export const WARNING_BG = 'rgba(232,179,75,0.14)';

export const FONT_HEADING = "'Playfair Display', Georgia, serif";
export const FONT_BODY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const TAB_MENU_HEIGHT = 56;
export const WEB_TAB_MENU_PADDING = 90;
export const SCROLL_EXTRA_PADDING = 16;

const glassEffect = {
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)'
};

// Frosted glass panels — translucent white over the vibrant aurora background.
export const glassCard = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 22,
  padding: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
  ...glassEffect
};

export const softCard = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 18,
  padding: 14,
  boxShadow: '0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)',
  ...glassEffect
};

// Frosted header band used at the top of every screen.
export const headerGlass = {
  background:
    'linear-gradient(180deg, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.14) 60%, rgba(255,255,255,0.04) 100%)',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  ...glassEffect
};
