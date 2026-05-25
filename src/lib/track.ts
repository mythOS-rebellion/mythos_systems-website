/**
 * Tiny wrapper around the MythOS Pro analytics tracker (getinfo.js).
 *
 * The tracker is loaded as a side-effect <script> tag in index.html and
 * exposes a global `window.mythos.track(name, data?)`. Components fire
 * named click events through this helper so we get one typed call site
 * instead of `(window as any).mythos?.track(...)` scattered everywhere.
 *
 * No-op when the script hasn't loaded yet (e.g. during the initial
 * render before getinfo.js arrives, or under ad-block). Safe to call
 * unconditionally from event handlers.
 */

interface MythosTracker {
  track: (name: string, data?: Record<string, unknown>) => void;
  pageview?: () => void;
}

declare global {
  interface Window {
    mythos?: MythosTracker;
  }
}

export function track(name: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.mythos?.track(name, data);
}
