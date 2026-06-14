export const hasAnalyticsConsent = () => {
  return localStorage.getItem('cookieConsent') === 'accepted';
};