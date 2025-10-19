export type RouteName = 'Login' | 'Main' | 'Next' | 'Messages' | 'Account' | 'Care' | 'Checkups' | 'Maintenance' | 'Trail' | 'News' | 'Results';

export type Navigate = (to: RouteName) => void;
export type GoBack = () => void;

export interface Router {
  current: RouteName;
  navigate: Navigate;
  goBack: GoBack;
  canGoBack: boolean;
}
