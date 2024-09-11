// src/utils/Analytics.ts
import ReactGA from "react-ga";

export const initGA = (): void => {
  ReactGA.initialize("YOUR_GA_TRACKING_ID");
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  ReactGA.event({ category, action, label, value });
};
