declare global {
  interface Window {
    ym?: (
      id: number,
      method: 'init' | 'hit' | 'reachGoal' | 'params' | 'userParams',
      params?: any
    ) => void;
  }
}

export {};

